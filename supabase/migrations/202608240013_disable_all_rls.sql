-- Migration 13: Disable Row Level Security (RLS) across all public tables
-- Note: User authentication credentials & password hashes remain securely managed
-- inside Supabase's internal auth.users schema and are never exposed.

DO $$
DECLARE
    r RECORD;
BEGIN
    FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') LOOP
        EXECUTE 'ALTER TABLE public.' || quote_ident(r.tablename) || ' DISABLE ROW LEVEL SECURITY;';
    END LOOP;
END $$;
