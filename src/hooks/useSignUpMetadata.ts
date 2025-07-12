import { useAuth } from '@auth0/auth0-react';
import { useEffect } from 'react';

export const useSignUpMetadata = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth();

  useEffect(() => {
    const updateUserMetadata = async () => {
      if (isAuthenticated && user) {
        const signupData = localStorage.getItem('travelstore_signup_data');
        
        if (signupData) {
          try {
            const metadata = JSON.parse(signupData);
            
            // Get access token for Management API
            const token = await getAccessTokenSilently({
              authorizationParams: {
                audience: 'https://dev-m2xi0s634eh3lhvw.us.auth0.com/api/v2/',
                scope: 'update:users'
              }
            });

            // Update user metadata
            await fetch(`https://dev-m2xi0s634eh3lhvw.us.auth0.com/api/v2/users/${user.sub}`, {
              method: 'PATCH',
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                user_metadata: {
                  ...metadata,
                  signupCompleted: true
                }
              })
            });

            // Clear the temporary data
            localStorage.removeItem('travelstore_signup_data');
            
            console.log('User metadata updated successfully!');
          } catch (error) {
            console.error('Error updating user metadata:', error);
          }
        }
      }
    };

    updateUserMetadata();
  }, [isAuthenticated, user, getAccessTokenSilently]);

  return { user };
};
