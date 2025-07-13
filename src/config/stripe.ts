import { loadStripe } from '@stripe/stripe-js';

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(import.meta.env.REACT_APP_STRIPE_PUBLISHABLE_KEY!);

export { stripePromise };

// Stripe configuration constants
export const STRIPE_CONFIG = {
  currency: 'usd',
  country: 'US',
  mode: 'payment' as const,
  success_url: `${window.location.origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
  cancel_url: `${window.location.origin}/cart`,
};

// Product price mapping (in cents)
export const PRODUCT_PRICES = {
  'prod-001': 2513, // L.25.13 = $25.13 USD
  'prod-002': 1256, // L.12.56 = $12.56 USD
  'prod-003': 1884, // L.18.84 = $18.84 USD
  'prod-004': 941,  // L.9.41 = $9.41 USD
  'prod-005': 1570, // L.15.70 = $15.70 USD
  'prod-006': 2199, // L.21.99 = $21.99 USD
  'prod-007': 1413, // L.14.13 = $14.13 USD
  'prod-008': 2827, // L.28.27 = $28.27 USD
  'prod-009': 2042, // L.20.42 = $20.42 USD
  'prod-010': 3140, // L.31.40 = $31.40 USD
  'kit-001': 2513,  // L.25.13 = $25.13 USD
  'kit-002': 2093,  // L.20.93 = $20.93 USD
  'kit-003': 3140,  // L.31.40 = $31.40 USD
};

export type ProductId = keyof typeof PRODUCT_PRICES;
