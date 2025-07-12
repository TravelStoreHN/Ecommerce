# Environment Variables to Add to Vercel

## Production Environment Variables
Add these to your Vercel project settings:

### Auth0 Configuration (Public - safe to add)
REACT_APP_AUTH0_DOMAIN=dev-m2xi0s634eh3lhvw.us.auth0.com
REACT_APP_AUTH0_CLIENT_ID=35m7ES1m99HOcxI6ekdm3hCuSvcKjXuZ

### Auth0 Machine to Machine (SECRET - keep private)
AUTH0_M2M_CLIENT_ID=mxCe9Sib7QDb8yoSIavseb3UboBapEpM
AUTH0_M2M_CLIENT_SECRET=mxCe9Sib7QDb8yoSIavseb3UboBapEpM

### Gmail Configuration (if needed)
REACT_APP_GMAIL_USER=TravelStoreHN@gmail.com
REACT_APP_GMAIL_APP_PASSWORD=your-16-character-app-password

## Steps to Add:
1. Go to https://vercel.com/alejandro-samids-projects/travelstorehn-app
2. Click "Settings" → "Environment Variables"
3. Add each variable above
4. Set Environment to "Production, Preview, and Development"
5. Click "Save"
6. Redeploy your app

## After Adding Variables:
Run: npx vercel --prod
Or trigger a new deployment from the Vercel dashboard.
