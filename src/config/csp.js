function generateCSP() {
  return "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://dev-m2xi0s634eh3lhvw.us.auth0.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://travelstorehn-app.vercel.app https://dev-m2xi0s634eh3lhvw.us.auth0.com; frame-src https://dev-m2xi0s634eh3lhvw.us.auth0.com;";
}

export { generateCSP };