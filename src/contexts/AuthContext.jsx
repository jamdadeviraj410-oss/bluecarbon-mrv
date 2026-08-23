/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import { createContext, useContext, useState, useCallback } from 'react';
import { ROLES } from '../utils/constants';

const AuthContext = createContext(null);

const MOCK_USERS = {
  admin: {
    id: 'usr-001',
    name: 'Admin User',
    email: 'admin@nccr.gov.in',
    role: ROLES.NCCR_ADMIN,
    organization: 'Registrar Office',
    avatar: null,
  },
  ngo: {
    id: 'usr-002',
    name: 'Priya Sharma',
    email: 'priya@ecotrust.org',
    role: ROLES.NGO,
    organization: 'EcoTrust India',
    avatar: null,
  },
  panchayat: {
    id: 'usr-003',
    name: 'Ramesh Patil',
    email: 'ramesh@ratnagiri.gov.in',
    role: ROLES.PANCHAYAT,
    organization: 'Ratnagiri Panchayat',
    avatar: null,
  },
  community: {
    id: 'usr-004',
    name: 'Anita Deshpande',
    email: 'anita@community.org',
    role: ROLES.COMMUNITY,
    organization: 'Sundarbans Community',
    avatar: null,
  },
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async (email, _password) => {
    setIsLoading(true);
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1200));

    // Match by email or default to admin
    const matched = Object.values(MOCK_USERS).find(
      (u) => u.email === email
    );
    const loggedInUser = matched || MOCK_USERS.admin;
    setUser(loggedInUser);
    setIsLoading(false);
    return loggedInUser;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const switchRole = useCallback((roleKey) => {
    const mockUser = MOCK_USERS[roleKey];
    if (mockUser) {
      setUser(mockUser);
    }
  }, []);

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
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
