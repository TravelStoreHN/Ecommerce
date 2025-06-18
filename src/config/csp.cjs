const isDev = process.env.NODE_ENV !== 'production';

function generateCSP() {
  return "default-src 'self'; script-src 'self' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self';";
}
module.exports = { generateCSP };