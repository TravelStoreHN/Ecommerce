# Setup Instructions for Custom Sign-Up with Additional Fields

## The Problem
Auth0's Custom Login Page feature is disabled when passkeys are enabled, which prevents us from adding custom fields directly to the Universal Login.

## Solution Options

### Option 1: Custom Sign-Up Form (Recommended)
Use our custom sign-up form that we've already built, which:
- Collects all the additional fields (name, phone, country, etc.)
- Creates the user via Auth0 Management API
- Redirects to Auth0 for login after successful signup

### Option 2: Auth0 Actions (Alternative)
Use Auth0 Actions to collect additional data after the user signs up through the standard Auth0 flow.

## Steps to Complete Setup

### Step 1: Create Machine-to-Machine Application in Auth0

1. **Go to Auth0 Dashboard → Applications**
2. **Click "Create Application"**
3. **Choose "Machine to Machine Applications"**
4. **Name it**: "TravelStoreHN Backend API"
5. **Select the "Auth0 Management API"**
6. **Select these scopes**:
   - `create:users`
   - `update:users`
   - `read:users`
7. **Copy the Client ID and Client Secret**

### Step 2: Update Environment Variables

Add these to your `.env` file:
```
AUTH0_M2M_CLIENT_ID=your-machine-to-machine-client-id
AUTH0_M2M_CLIENT_SECRET=your-machine-to-machine-client-secret
```

### Step 3: Test the Custom Sign-Up Form

1. Go to `http://localhost:5175/#/signup`
2. Fill in all the fields
3. Submit the form
4. User should be created with all the metadata

### Step 4: Access User Metadata in Your App

After login, you can access the user's additional fields:

```javascript
const { user } = useAuth();

// Access the metadata
const firstName = user?.user_metadata?.firstName;
const lastName = user?.user_metadata?.lastName;
const phone = user?.user_metadata?.phone;
const country = user?.user_metadata?.country;
```

## Alternative: Disable Passkeys

If you want to use Auth0's Custom Login Page instead:

1. **Go to Auth0 Dashboard → Authentication → Passwordless**
2. **Turn OFF passkeys**
3. **Go back to Advanced Options → Login**
4. **Enable "Customize Login Page"**
5. **Add the custom HTML with additional fields**

This will allow you to customize the Universal Login directly, but you'll lose passkey functionality.

## Current Status

✅ Custom sign-up form created with all fields
✅ Navigation updated with sign-up links
✅ Backend API endpoint created (`/api/auth/signup`)
✅ Auth0 SDK installed
⏳ Need to set up Machine-to-Machine application in Auth0
⏳ Need to update environment variables with M2M credentials
