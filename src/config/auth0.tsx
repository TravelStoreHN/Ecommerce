import React, { ReactNode } from 'react';
import { AppState, Auth0Provider as Auth0ProviderBase } from '@auth0/auth0-react';

export const auth0Config = {
  domain: process.env.REACT_APP_AUTH0_DOMAIN || '',
  clientId: process.env.REACT_APP_AUTH0_CLIENT_ID || '',
  audience: process.env.REACT_APP_AUTH0_AUDIENCE,
  redirectUri: window.location.origin,
  scope: 'openid profile email'
};

// Debug logging
console.log('Auth0 Config Debug:', {
  domain: process.env.REACT_APP_AUTH0_DOMAIN,
  clientId: process.env.REACT_APP_AUTH0_CLIENT_ID,
  audience: process.env.REACT_APP_AUTH0_AUDIENCE
});

// Auth0Provider wrapper with proper typing
interface Auth0ProviderProps {
  children: ReactNode;
}

export const Auth0Provider: React.FC<Auth0ProviderProps> = ({ children }) => {
  const onRedirectCallback = (appState?: AppState) => {
    window.history.replaceState(
      {},
      document.title,
      appState?.returnTo || window.location.pathname
    );
  };

  return (
    <Auth0ProviderBase
      domain={auth0Config.domain}
      clientId={auth0Config.clientId}
      authorizationParams={{
        redirect_uri: auth0Config.redirectUri,
        ...(auth0Config.audience && { audience: auth0Config.audience }),
        scope: auth0Config.scope
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0ProviderBase>
  );
};
