const Stripe = require('stripe');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', 'https://www.travelstorehn.com');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { sessionId } = req.query;

    if (!sessionId) {
      res.status(400).json({ error: 'Session ID is required' });
      return;
    }

    // Retrieve the checkout session
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items', 'customer', 'payment_intent'],
    });

    res.status(200).json({
      id: session.id,
      status: session.status,
      payment_status: session.payment_status,
      amount_total: session.amount_total,
      currency: session.currency,
      customer_email: session.customer_details?.email,
      customer_name: session.customer_details?.name,
      line_items: session.line_items,
      shipping: session.shipping,
      metadata: session.metadata,
    });

  } catch (error) {
    console.error('Error retrieving checkout session:', error);
    res.status(500).json({ 
      error: 'Failed to retrieve checkout session',
      message: error.message 
    });
  }
};
