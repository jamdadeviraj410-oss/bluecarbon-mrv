import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://rmiyueszxpsfyzvjehdx.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJtaXl1ZXN6eHBzZnl6dmplaGR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc0OTg0MDcsImV4cCI6MjEwMzA3NDQwN30.rZWRuJQSJaDSKZC51oFT320tmPX736CGzOdLz9mcIp8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

export default supabase;
