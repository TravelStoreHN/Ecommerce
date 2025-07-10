# Auth0 Setup Guide for TravelStoreHN

## 🔐 Security Overview

### Public Values (Safe in frontend):
- `REACT_APP_AUTH0_DOMAIN` - Your Auth0 tenant domain
- `REACT_APP_AUTH0_CLIENT_ID` - Public identifier for your app
- `REACT_APP_AUTH0_AUDIENCE` - API identifier (optional but recommended)

### Private Values (Never expose):
- Auth0 Client Secret (not used in React SPAs)
- Management API tokens
- Database credentials
- Private API keys

## 🚀 Setup Steps

### 1. Create Auth0 Account
1. Go to [auth0.com](https://auth0.com) and sign up
2. Create a new tenant (e.g., `travelstorehn`)

### 2. Create Application
1. In Auth0 Dashboard, go to Applications
2. Click "Create Application"
3. Choose "Single Page Web Applications"
4. Select "React"

### 3. Configure Application Settings
```
Name: TravelStoreHN
Type: Single Page Application
Allowed Callback URLs: http://localhost:5173, https://travelstorehn.com
Allowed Logout URLs: http://localhost:5173, https://travelstorehn.com
Allowed Web Origins: http://localhost:5173, https://travelstorehn.com
```

### 4. Update Environment Variables
Copy the values from your Auth0 application to your `.env` file:

```env
REACT_APP_AUTH0_DOMAIN=your-tenant.auth0.com
REACT_APP_AUTH0_CLIENT_ID=your-client-id-from-auth0
REACT_APP_AUTH0_AUDIENCE=https://api.travelstorehn.com  # Optional API identifier
```

### 5. Production Deployment
For production (Vercel), add these environment variables in your deployment platform:
- Vercel: Project Settings → Environment Variables
- Netlify: Site Settings → Environment Variables

## 🔧 Local Development
1. Copy `.env.example` to `.env`
2. Fill in your Auth0 values
3. Never commit `.env` to git (already in .gitignore)

## 🌐 Features Included
- ✅ Login/Logout
- ✅ User profile display
- ✅ Protected routes
- ✅ Loading states
- ✅ Error handling
- ✅ TypeScript support

## 🛡️ Security Best Practices Applied
- Environment variables for configuration
- Proper Auth0 SPA configuration
- HTTPS enforcement in production
- Secure callback URLs
- Token management handled by Auth0 SDK
