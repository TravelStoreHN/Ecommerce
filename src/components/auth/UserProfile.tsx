import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

const UserProfile: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="flex items-center space-x-3">
      {user.avatar && (
        <img
          src={user.avatar}
          alt={user.name}
          className="w-8 h-8 rounded-full object-cover"
        />
      )}
      <div className="text-sm">
        <p className="font-medium text-gray-900">{user.name}</p>
        <p className="text-gray-500">{user.email}</p>
      </div>
    </div>
  );
};

export default UserProfile;
