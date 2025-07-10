import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import LoadingSpinner from '../ui/LoadingSpinner';
import LoginButton from '../auth/LoginButton';
import { UserCircleIcon } from '@heroicons/react/24/outline';

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  fallback 
}) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return fallback || (
      <div className="flex flex-col items-center justify-center min-h-[400px] bg-white rounded-xl shadow-lg p-8 text-center">
        <UserCircleIcon className="h-24 w-24 text-purple-400 mb-6" />
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Authentication Required</h2>
        <p className="text-gray-600 mb-8 max-w-md">
          Please log in to access this page and manage your account.
        </p>
        <LoginButton />
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
