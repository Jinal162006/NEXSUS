import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types/legal';
import { authService } from '../services/auth';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  loginWithEmail: (email: string, password?: string) => Promise<User>;
  signupWithEmail: (name: string, email: string, password?: string) => Promise<User>;
  loginWithGoogle: () => Promise<User>;
  updateUser: (updates: Partial<User>) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check initial session
    const current = authService.getCurrentUser();
    setUser(current);
    setIsLoading(false);
  }, []);

  const loginWithEmail = async (email: string, password?: string) => {
    setIsLoading(true);
    try {
      const u = await authService.loginWithEmail(email, password);
      setUser(u);
      return u;
    } finally {
      setIsLoading(false);
    }
  };

  const signupWithEmail = async (name: string, email: string, password?: string) => {
    setIsLoading(true);
    try {
      const u = await authService.signupWithEmail(name, email, password);
      setUser(u);
      return u;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      const u = await authService.loginWithGoogle();
      setUser(u);
      return u;
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = (updates: Partial<User>) => {
    const updated = authService.updateUserProfile(updates);
    if (updated) {
      setUser(updated);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        isLoading,
        loginWithEmail,
        signupWithEmail,
        loginWithGoogle,
        updateUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
