# Stripe Integration Setup Guide

## 🎯 Overview
This guide walks you through setting up Stripe payments for TravelStoreHN, including shopping cart abandonment emails and follow-up sequences.

## 📋 Prerequisites
- Auth0 integration already implemented ✅
- Stripe account (free to start)
- Domain configured for webhooks

## 🚀 Step 1: Stripe Account Setup

### 1.1 Create Stripe Account
1. Go to [stripe.com](https://stripe.com) and create an account
2. Complete business verification (for live payments)
3. Set up your business profile

### 1.2 Get API Keys
1. Go to **Developers > API Keys** in Stripe Dashboard
2. Copy your **Publishable Key** (starts with `pk_test_`)
3. Copy your **Secret Key** (starts with `sk_test_`)

### 1.3 Update Environment Variables
```bash
# Update .env file
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_your_actual_key_here
STRIPE_SECRET_KEY=sk_test_your_actual_secret_key_here
```

## 🛍️ Step 2: Product Catalog Setup

### 2.1 Create Products in Stripe Dashboard
1. Go to **Products** in Stripe Dashboard
2. Create products for each item in your catalog:
   - Adaptador Universal BOPU-1033
   - Adaptador Giratorio EU
   - Antifaz para Dormir
   - etc.

### 2.2 Set Pricing
- Use USD pricing (Stripe requirement)
- Current conversion: 1 USD ≈ 25 HNL
- Example: L.25.13 = $1.01 USD

## 📧 Step 3: Email Automation Setup

### 3.1 Webhook Configuration
1. Go to **Developers > Webhooks** in Stripe Dashboard
2. Add endpoint: `https://your-domain.com/api/stripe/webhook`
3. Select events:
   - `checkout.session.completed`
   - `checkout.session.expired`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`

### 3.2 Email Triggers
- **Welcome Email**: Triggered on first successful payment
- **Order Confirmation**: Triggered on `checkout.session.completed`
- **Cart Abandonment**: Triggered on `checkout.session.expired`
- **Follow-up**: Triggered 24h after successful payment

## 🔧 Step 4: Testing

### 4.1 Test Cards
Use Stripe test cards:
- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- Any future date for expiry
- Any 3-digit CVC

### 4.2 Test Workflow
1. Add products to cart
2. Proceed to checkout
3. Use test card
4. Verify order confirmation
5. Check webhook delivery

## 🚀 Step 5: Going Live

### 5.1 Business Verification
- Complete Stripe business verification
- Activate live payments
- Update environment variables with live keys

### 5.2 Production Checklist
- [ ] Live Stripe keys configured
- [ ] Webhook endpoints verified
- [ ] Email templates tested
- [ ] Customer support ready
- [ ] Refund policy published

## 📊 Features Implemented

### ✅ Core Payment Features
- [x] Shopping cart with persistence
- [x] Single product checkout
- [x] Cart checkout
- [x] Payment confirmation page
- [x] Stripe customer creation via Auth0
- [x] Order success/failure handling

### 🔄 Next Phase: Email Automation
- [ ] Welcome email sequence
- [ ] Cart abandonment emails
- [ ] Order confirmation emails
- [ ] Follow-up sequences
- [ ] Customer segmentation

### 🎯 Future Enhancements
- [ ] Subscription products
- [ ] Discount codes
- [ ] Inventory management
- [ ] Advanced analytics
- [ ] Multi-currency support

## 🆘 Troubleshooting

### Common Issues
1. **CORS Errors**: Check domain whitelist in Stripe
2. **Webhook Failures**: Verify endpoint URL and SSL
3. **Payment Failures**: Check test card details
4. **Session Expired**: Extend session timeout

### Support Resources
- [Stripe Documentation](https://stripe.com/docs)
- [Auth0 + Stripe Guide](https://auth0.com/docs/customize/actions/flows-and-triggers/login-flow/add-user-to-stripe)
- TravelStoreHN Support: info@travelstorehn.com

---

**Ready to start?** Update your Stripe keys in `.env` and test your first payment! 🎉
