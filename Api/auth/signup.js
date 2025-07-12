const auth0 = require('auth0');

// Auth0 Management API configuration
const management = new auth0.ManagementClient({
  domain: process.env.REACT_APP_AUTH0_DOMAIN,
  clientId: process.env.AUTH0_M2M_CLIENT_ID, // Machine to Machine Client ID
  clientSecret: process.env.AUTH0_M2M_CLIENT_SECRET, // Machine to Machine Client Secret
  scope: 'create:users update:users read:users'
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email, password, firstName, lastName, phone, country, dateOfBirth } = req.body;

    // Validate required fields
    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Create user in Auth0
    const newUser = await management.createUser({
      connection: 'Username-Password-Authentication',
      email,
      password,
      name: `${firstName} ${lastName}`,
      user_metadata: {
        firstName,
        lastName,
        phone,
        country,
        dateOfBirth,
        signupSource: 'custom_form'
      }
    });

    return res.status(201).json({ 
      message: 'User created successfully',
      userId: newUser.user_id 
    });

  } catch (error) {
    console.error('Sign-up error:', error);
    
    // Handle Auth0 specific errors
    if (error.statusCode === 409) {
      return res.status(409).json({ message: 'User already exists' });
    }
    
    if (error.statusCode === 400) {
      return res.status(400).json({ message: 'Invalid user data' });
    }

    return res.status(500).json({ message: 'Internal server error' });
  }
}
