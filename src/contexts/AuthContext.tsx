
import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import { User } from '../types'; // Assuming User type is defined in types.ts

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data
const mockUser: User = {
  id: 'user-mock-123',
  name: 'Alex Viajero',
  email: 'alex.viajero@example.com',
  avatar: 'https://picsum.photos/seed/avatar1/200/200' // Placeholder avatar
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback(() => {
    // In a real app, this would involve API calls, token handling, etc.
    setIsAuthenticated(true);
    setUser(mockUser);
    console.log("User logged in (mock)");
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setUser(null);
    console.log("User logged out (mock)");
    // In a real app, clear tokens, redirect, etc.
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
