/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { ROLES } from '../utils/constants';
import {
  loginUser,
  signUpUser,
  logoutUser,
  resetPassword as sendPasswordReset,
  subscribeToAuthChanges,
  getCurrentUser,
  updateUserProfile,
} from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Helper to format user object for app consumption
  const formatAuthUser = (supabaseUser, profile) => {
    if (!supabaseUser) return null;

    const metadata = supabaseUser.user_metadata || {};
    const role = profile?.role || metadata.role || ROLES.NCCR_ADMIN;
    const orgName = profile?.organization?.name || metadata.organization || 'Registrar Office';

    return {
      id: supabaseUser.id,
      email: supabaseUser.email,
      name: profile?.full_name || metadata.full_name || metadata.name || supabaseUser.email?.split('@')[0] || 'User',
      role,
      organization: orgName,
      organizationId: profile?.organization_id || metadata.organization_id || null,
      phone: profile?.phone || metadata.phone || null,
      avatar: profile?.avatar_url || null,
      profile,
    };
  };

  // Restore session on mount & subscribe to changes
  useEffect(() => {
    let isMounted = true;

    async function initSession() {
      try {
        const current = await getCurrentUser();
        if (isMounted && current) {
          setUser(formatAuthUser(current, current.profile));
        }
      } catch (err) {
        console.error('Session initialization error:', err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    initSession();

    const { data: authListener } = subscribeToAuthChanges((_event, currentSession, profile) => {
      if (!isMounted) return;

      setSession(currentSession);
      if (currentSession?.user) {
        setUser(formatAuthUser(currentSession.user, profile));
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => {
      isMounted = false;
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  const login = useCallback(async (email, password) => {
    setIsLoading(true);
    try {
      const { user: authUser, profile, session: authSession } = await loginUser(email, password);
      const appUser = formatAuthUser(authUser, profile);
      setUser(appUser);
      setSession(authSession);
      return appUser;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signup = useCallback(async (data) => {
    setIsLoading(true);
    try {
      const { user: authUser, profile, session: authSession } = await signUpUser(data);
      const appUser = formatAuthUser(authUser, profile);
      setUser(appUser);
      setSession(authSession);
      return appUser;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await logoutUser();
      setUser(null);
      setSession(null);
    } catch (err) {
      console.error('Logout error:', err);
      setUser(null);
      setSession(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const resetPassword = useCallback(async (email) => {
    return await sendPasswordReset(email);
  }, []);

  const updateProfile = useCallback(async (updates) => {
    if (!user?.id) return;
    const updatedProfile = await updateUserProfile(user.id, updates);
    setUser((prev) => ({
      ...prev,
      name: updatedProfile.full_name || prev.name,
      phone: updatedProfile.phone || prev.phone,
      avatar: updatedProfile.avatar_url || prev.avatar,
      profile: updatedProfile,
    }));
    return updatedProfile;
  }, [user]);

  // Role switch helper (updates user role in DB & state if authorized)
  const switchRole = useCallback((roleKey) => {
    setUser((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        role: ROLES[roleKey] || roleKey,
      };
    });
  }, []);

  const value = {
    user,
    session,
    isAuthenticated: !!user,
    isLoading,
    login,
    signup,
    logout,
    resetPassword,
    updateProfile,
    switchRole,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
