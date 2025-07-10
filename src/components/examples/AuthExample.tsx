import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import LoginButton from '../auth/LoginButton';
import LogoutButton from '../auth/LogoutButton';
import UserProfile from '../auth/UserProfile';

/**
 * Example component showing how to use Auth0 authentication
 * You can use this as a reference for integrating auth into other components
 */
const AuthExample: React.FC = () => {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">Authentication Status</h2>
      
      {isAuthenticated ? (
        <div className="space-y-4">
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800 font-medium">✅ Authenticated</p>
          </div>
          
          <UserProfile />
          
          <div className="space-y-2">
            <p className="text-sm text-gray-600">User Details:</p>
            <ul className="text-sm space-y-1">
              <li><strong>ID:</strong> {user?.id}</li>
              <li><strong>Name:</strong> {user?.name}</li>
              <li><strong>Email:</strong> {user?.email}</li>
              <li><strong>Verified:</strong> {user?.email_verified ? '✅' : '❌'}</li>
            </ul>
          </div>
          
          <LogoutButton />
        </div>
      ) : (
        <div className="space-y-4">
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-800 font-medium">⚠️ Not Authenticated</p>
          </div>
          
          <p className="text-gray-600">Please log in to access your account.</p>
          
          <LoginButton />
        </div>
      )}
    </div>
  );
};

export default AuthExample;
