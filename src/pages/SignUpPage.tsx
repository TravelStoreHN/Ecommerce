import React from 'react';
import CustomSignUpForm from '../components/auth/CustomSignUpForm';

const SignUpPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <img 
            src="/images/app-logo.jpg" 
            alt="TravelStoreHN Logo" 
            className="mx-auto h-16 w-auto"
          />
          <h1 className="mt-4 text-3xl font-bold text-gray-900">
            Welcome to TravelStoreHN
          </h1>
          <p className="mt-2 text-gray-600">
            Your one-stop shop for travel essentials
          </p>
        </div>
        
        <CustomSignUpForm />
      </div>
    </div>
  );
};

export default SignUpPage;
