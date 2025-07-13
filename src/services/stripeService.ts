import { PRODUCT_PRICES, ProductId } from '../config/stripe';

export interface CheckoutItem {
  id: string;
  name: string;
  price: string;
  imageUrl: string;
  category?: string;
  quantity: number;
}

export interface CheckoutSessionData {
  items: CheckoutItem[];
  successUrl?: string;
  cancelUrl?: string;
  customerEmail?: string;
  userId?: string;
}

export interface CheckoutSessionResponse {
  sessionId: string;
  url: string;
}

/**
 * Create a Stripe checkout session
 */
export const createCheckoutSession = async (
  data: CheckoutSessionData,
  accessToken?: string
): Promise<CheckoutSessionResponse> => {
  const response = await fetch('/api/stripe/create-checkout-session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to create checkout session: ${error}`);
  }

  return response.json();
};

/**
 * Get checkout session details
 */
export const getCheckoutSession = async (sessionId: string): Promise<any> => {
  const response = await fetch(`/api/stripe/checkout-session/${sessionId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to get checkout session: ${error}`);
  }

  return response.json();
};

/**
 * Calculate total price for cart items
 */
export const calculateCartTotal = (items: CheckoutItem[]): number => {
  return items.reduce((total, item) => {
    const price = PRODUCT_PRICES[item.id as ProductId] || 0;
    return total + (price * item.quantity);
  }, 0);
};

/**
 * Format price from cents to display format
 */
export const formatPrice = (priceInCents: number, currency: string = 'USD'): string => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  });
  
  return formatter.format(priceInCents / 100);
};

/**
 * Convert Lempira price to USD cents for Stripe
 */
export const convertLempiraToUSDCents = (lempiraPrice: string): number => {
  // Remove 'L.' prefix and convert to number
  const lempiraAmount = parseFloat(lempiraPrice.replace('L.', ''));
  
  // Convert to USD (approximate rate: 1 USD = 25 HNL)
  const usdAmount = lempiraAmount / 25;
  
  // Convert to cents
  return Math.round(usdAmount * 100);
};
