const Stripe = require('stripe');
const { getStripePriceId } = require('./price-mapping');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', 'https://www.travelstorehn.com');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { items, successUrl, cancelUrl, customerEmail, userId } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      res.status(400).json({ error: 'Items are required' });
      return;
    }

    // Convert cart items to Stripe line items using pre-created price IDs
    const lineItems = items.map(item => {
      const priceId = getStripePriceId(item.id);
      
      if (!priceId) {
        throw new Error(`No Stripe price ID found for product: ${item.id}`);
      }

      return {
        price: priceId,
        quantity: item.quantity,
      };
    });

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: successUrl || `${req.headers.origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${req.headers.origin}/cart`,
      customer_email: customerEmail,
      metadata: {
        userId: userId || '',
        source: 'travelstorehn',
      },
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'HN', 'GT', 'SV', 'NI', 'CR', 'PA'],
      },
      allow_promotion_codes: true,
    });

    res.status(200).json({
      sessionId: session.id,
      url: session.url,
    });

  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ 
      error: 'Failed to create checkout session',
      message: error.message 
    });
  }
};
