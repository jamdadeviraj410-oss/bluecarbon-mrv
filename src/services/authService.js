import { supabase } from '../lib/supabase';

/**
 * Real Supabase Authentication & Profile Service
 */

export async function loginUser(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw error;
  }

  // Fetch corresponding profile
  const profile = await getUserProfile(data.user.id);

  return {
    user: data.user,
    session: data.session,
    profile,
  };
}

export async function signUpUser({ email, password, fullName, role = 'COMMUNITY', organizationId = null, phone = null }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        role,
        organization_id: organizationId,
        phone,
      },
    },
  });

  if (error) {
    throw error;
  }

  let profile = null;
  if (data.user) {
    profile = await getUserProfile(data.user.id);
  }

  return {
    user: data.user,
    session: data.session,
    profile,
  };
}

export async function logoutUser() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw error;
  }
  return { success: true };
}

export async function resetPassword(email) {
  const redirectTo = `${window.location.origin}/status`;
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo,
  });

  if (error) {
    throw error;
  }

  return { success: true, data, message: `Reset instructions sent to ${email}` };
}

export async function getCurrentUser() {
  const { data: { session }, error: sessionError } = await supabase.auth.getSession();
  if (sessionError || !session?.user) {
    return null;
  }

  const profile = await getUserProfile(session.user.id);
  return {
    ...session.user,
    profile,
  };
}

export async function getUserProfile(userId) {
  if (!userId) return null;

  const { data, error } = await supabase
    .from('profiles')
    .select(`
      *,
      organization:organizations(id, org_code, name, type, status, location, state)
    `)
    .eq('id', userId)
    .maybeSingle();

  if (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }

  return data;
}

export async function updateUserProfile(userId, updates) {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export function subscribeToAuthChanges(callback) {
  return supabase.auth.onAuthStateChange(async (event, session) => {
    let profile = null;
    if (session?.user) {
      profile = await getUserProfile(session.user.id);
    }
    callback(event, session, profile);
  });
}
