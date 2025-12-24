import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authApi } from '@/services/api';

interface User {
  id: string;
  email: string;
  role: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on mount
    const checkAuth = async () => {
      const token = localStorage.getItem('auth_token');
      if (token) {
        try {
          // TODO: Validate token with Spring Boot backend
          const storedUser = localStorage.getItem('auth_user');
          if (storedUser) {
            setUser(JSON.parse(storedUser));
          }
        } catch (error) {
          console.error('Auth check failed:', error);
          localStorage.removeItem('auth_token');
          localStorage.removeItem('auth_user');
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await authApi.login(email, password);
    localStorage.setItem('auth_token', response.token);
    localStorage.setItem('auth_user', JSON.stringify(response.user));
    setUser(response.user);
  };

  const logout = async () => {
    await authApi.logout();
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'ADMIN',
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
