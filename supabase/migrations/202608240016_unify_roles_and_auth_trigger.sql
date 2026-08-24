-- Migration 16: Role System Unification, Auth User Trigger, and RLS Hardening
-- Safe, non-destructive migration ensuring strict RBAC and profile integrity

-- 1. Harmonize Role Check Constraint on Profiles
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_role_check;
ALTER TABLE public.profiles ADD CONSTRAINT profiles_role_check 
    CHECK (role IN (
        'NCCR_ADMIN',
        'VERIFIER',
        'NGO',
        'PANCHAYAT',
        'COMMUNITY',
        'PROJECT_MANAGER',
        'ORG_ADMIN',
        'FIELD_OFFICER',
        'AUDITOR',
        'BUYER',
        'COMMUNITY_USER'
    ));

ALTER TABLE public.profiles ALTER COLUMN role SET DEFAULT 'COMMUNITY';

-- 2. Automatic Profile Provisioning Trigger on auth.users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
    v_role TEXT;
    v_full_name TEXT;
    v_org_id UUID;
    v_phone TEXT;
BEGIN
    -- Extract desired role from signup metadata
    v_role := COALESCE(NEW.raw_user_meta_data->>'role', 'COMMUNITY');

    -- Security Guard: Disallow self-assigned NCCR_ADMIN through public signup
    IF v_role = 'NCCR_ADMIN' THEN
        v_role := 'COMMUNITY';
    END IF;

    -- Validate role exists in allowed list
    IF v_role NOT IN ('NCCR_ADMIN', 'VERIFIER', 'NGO', 'PANCHAYAT', 'COMMUNITY', 'PROJECT_MANAGER', 'ORG_ADMIN', 'FIELD_OFFICER', 'AUDITOR', 'BUYER', 'COMMUNITY_USER') THEN
        v_role := 'COMMUNITY';
    END IF;

    -- Extract name & metadata
    v_full_name := COALESCE(
        NULLIF(NEW.raw_user_meta_data->>'full_name', ''),
        NULLIF(NEW.raw_user_meta_data->>'name', ''),
        split_part(NEW.email, '@', 1),
        'User'
    );
    v_phone := NEW.raw_user_meta_data->>'phone';
    
    BEGIN
        v_org_id := (NEW.raw_user_meta_data->>'organization_id')::UUID;
    EXCEPTION WHEN OTHERS THEN
        v_org_id := NULL;
    END;

    -- Upsert profile with matching auth user ID
    INSERT INTO public.profiles (
        id,
        email,
        full_name,
        role,
        organization_id,
        phone,
        is_active,
        created_at,
        updated_at
    )
    VALUES (
        NEW.id,
        NEW.email,
        v_full_name,
        v_role,
        v_org_id,
        v_phone,
        true,
        now(),
        now()
    )
    ON CONFLICT (id) DO UPDATE SET
        email = EXCLUDED.email,
        full_name = COALESCE(NULLIF(EXCLUDED.full_name, ''), public.profiles.full_name),
        phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
        updated_at = now();

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Bind trigger to auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 3. Hardened RLS Policies for Profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can read profiles in same org or public" ON public.profiles;
DROP POLICY IF EXISTS "Public read profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can read own profile or org profiles or admins" ON public.profiles;

CREATE POLICY "Users can read own profile or org profiles or admins" ON public.profiles
    FOR SELECT TO authenticated
    USING (
        auth.uid() = id 
        OR public.is_nccr_admin() 
        OR (organization_id IS NOT NULL AND public.is_org_member(organization_id))
    );

DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
CREATE POLICY "Users can insert own profile" ON public.profiles
    FOR INSERT TO authenticated
    WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE TO authenticated
    USING (auth.uid() = id OR public.is_nccr_admin())
    WITH CHECK (auth.uid() = id OR public.is_nccr_admin());

DROP POLICY IF EXISTS "Admins can manage all profiles" ON public.profiles;
CREATE POLICY "Admins can manage all profiles" ON public.profiles
    FOR ALL TO authenticated
    USING (public.is_nccr_admin())
    WITH CHECK (public.is_nccr_admin());

-- 4. Hardened RLS Policies for Onboarding Requests
ALTER TABLE public.onboarding_requests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public and authenticated can submit onboarding requests" ON public.onboarding_requests;
CREATE POLICY "Public and authenticated can submit onboarding requests" ON public.onboarding_requests
    FOR INSERT TO anon, authenticated
    WITH CHECK (true);

DROP POLICY IF EXISTS "Public can view application status" ON public.onboarding_requests;
DROP POLICY IF EXISTS "Public can view application status with code" ON public.onboarding_requests;
CREATE POLICY "Public can view application status" ON public.onboarding_requests
    FOR SELECT TO anon, authenticated
    USING (true);

DROP POLICY IF EXISTS "NCCR Admins can manage onboarding requests" ON public.onboarding_requests;
CREATE POLICY "NCCR Admins can manage onboarding requests" ON public.onboarding_requests
    FOR ALL TO authenticated
    USING (public.is_nccr_admin())
    WITH CHECK (public.is_nccr_admin());

-- 5. Safe Provisioning RPC for Organization Onboarding Approval
CREATE OR REPLACE FUNCTION public.approve_onboarding_and_provision_org(
    p_request_id UUID,
    p_review_notes TEXT DEFAULT NULL
)
RETURNS JSONB AS $$
DECLARE
    v_req RECORD;
    v_org_id UUID;
    v_org_code TEXT;
    v_user_role TEXT;
BEGIN
    -- Verify caller is NCCR Administrator
    IF NOT public.is_nccr_admin() THEN
        RAISE EXCEPTION 'Unauthorized: Only NCCR Administrators can approve onboarding requests.';
    END IF;

    SELECT * INTO v_req FROM public.onboarding_requests WHERE id = p_request_id;
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Onboarding request not found: %', p_request_id;
    END IF;

    -- Generate unique Org Code
    v_org_code := 'ORG-' || UPPER(SUBSTRING(v_req.organization_type FROM 1 FOR 3)) || '-' || (floor(random() * 8999 + 1000))::TEXT;

    -- Create Organization record
    INSERT INTO public.organizations (
        org_code,
        name,
        type,
        state,
        location,
        contact_email,
        contact_phone,
        status,
        is_verified,
        created_at,
        updated_at
    )
    VALUES (
        v_org_code,
        v_req.organization_name,
        v_req.organization_type,
        v_req.state,
        v_req.district || COALESCE(', ' || v_req.panchayat_or_block, ''),
        v_req.primary_contact_email,
        v_req.primary_contact_phone,
        'ACTIVE',
        true,
        now(),
        now()
    )
    RETURNING id INTO v_org_id;

    -- Determine appropriate provisioned role
    IF v_req.organization_type = 'NGO' THEN
        v_user_role := 'NGO';
    ELSIF v_req.organization_type = 'PANCHAYAT' THEN
        v_user_role := 'PANCHAYAT';
    ELSIF v_req.organization_type = 'DEVELOPER' THEN
        v_user_role := 'PROJECT_MANAGER';
    ELSE
        v_user_role := 'ORG_ADMIN';
    END IF;

    -- If applicant has an existing profile, link organization and assign role
    IF v_req.submitted_by IS NOT NULL THEN
        UPDATE public.profiles
        SET organization_id = v_org_id,
            role = v_user_role,
            updated_at = now()
        WHERE id = v_req.submitted_by;

        -- Insert membership
        INSERT INTO public.organization_members (organization_id, user_id, role_in_org, joined_at)
        VALUES (v_org_id, v_req.submitted_by, 'ADMIN', now())
        ON CONFLICT (organization_id, user_id) DO NOTHING;
    END IF;

    -- Update onboarding request status
    UPDATE public.onboarding_requests
    SET status = 'APPROVED',
        created_org_id = v_org_id,
        reviewed_by = auth.uid(),
        review_notes = COALESCE(p_review_notes, 'Approved by NCCR Administrator. Organization provisioned.'),
        updated_at = now()
    WHERE id = p_request_id;

    RETURN jsonb_build_object(
        'success', true,
        'organizationId', v_org_id,
        'organizationCode', v_org_code,
        'status', 'APPROVED'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
