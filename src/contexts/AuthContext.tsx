
import React, { createContext, useContext, ReactNode } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { User } from '../types';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  login: () => void;
  logout: () => void;
  loginWithRedirect?: (options?: any) => Promise<void>;
  getAccessTokenSilently?: () => Promise<string>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const {
    isAuthenticated,
    isLoading,
    user: auth0User,
    loginWithRedirect,
    logout: auth0Logout,
    getAccessTokenSilently,
  } = useAuth0();

  // Transform Auth0 user to our User type
  const user: User | null = auth0User ? {
    id: auth0User.sub || '',
    name: auth0User.name || '',
    email: auth0User.email || '',
    avatar: auth0User.picture,
    email_verified: auth0User.email_verified,
    nickname: auth0User.nickname,
    picture: auth0User.picture,
    sub: auth0User.sub,
    updated_at: auth0User.updated_at,
  } : null;

  const login = () => {
    loginWithRedirect();
  };

  const logout = () => {
    auth0Logout({
      logoutParams: {
        returnTo: window.location.origin
      }
    });
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      isLoading, 
      user, 
      login, 
      logout, 
      loginWithRedirect,
      getAccessTokenSilently 
    }}>
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
