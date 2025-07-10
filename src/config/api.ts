// API configuration
const API_CONFIG = {
  // Use relative path if on Vercel, absolute URL if on GitHub Pages
  baseURL: window.location.hostname.includes('vercel.app') 
    ? '' 
    : 'https://travelstorehn-app.vercel.app'
};

export const API_ENDPOINTS = {
  sendWelcomeEmail: `${API_CONFIG.baseURL}/api/sendwelcomeemail`
};
