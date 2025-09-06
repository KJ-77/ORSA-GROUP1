# ORSA Olive Oil - Stripe Payment Integration

This project integrates Stripe payment processing into the ORSA olive oil e-commerce website.

## 🔐 Environment Setup

### Frontend (.env in root directory)

```
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_51RpXokLdSoUxQBJkJyZbMFQefVdKnLaTtCEb8DuPyc7cQTGzyCfp467ceRrwHTiFUucHznjjqXTBEWctGsVDh5Mm00ymL42fbv
VITE_API_URL=http://localhost:3001
```

### Backend (backend/.env)

```
STRIPE_SECRET_KEY=sk_live_your_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
PORT=3001
```

## 🚀 Getting Started

### 1. Add Your Stripe Secret Key

Replace `sk_live_your_secret_key_here` in `backend/.env` with your actual Stripe secret key.

### 2. Start the Backend Server

```bash
cd backend
npm run dev
```

### 3. Start the Frontend

```bash
npm run dev
```

### 4. Set Up Stripe Webhooks (Production)

1. Go to your Stripe Dashboard
2. Navigate to Developers > Webhooks
3. Add endpoint: `https://yourdomain.com/api/webhook`
4. Select events: `payment_intent.succeeded`, `payment_intent.payment_failed`
5. Copy the webhook secret to your backend `.env` file

## 💳 Testing Payments

Use these test card numbers in development:

- **Success**: 4242 4242 4242 4242
- **Declined**: 4000 0000 0000 0002
- **Requires Authentication**: 4000 0025 0000 3155

Use any future expiry date, any 3-digit CVC, and any ZIP code.

## 🔄 Payment Flow

1. **Add to Cart**: Users add olive oil products to their cart
2. **Checkout**: Users click "Proceed to Checkout" from cart page
3. **Payment Form**: Users fill out shipping and payment information
4. **Processing**: Stripe securely processes the payment
5. **Confirmation**: Users see success page and receive confirmation

## 📁 New Files Added

### Frontend

- `src/context/StripeContext.tsx` - Stripe React integration
- `src/components/CheckoutForm.tsx` - Payment form component
- `src/pages/Checkout.tsx` - Checkout page
- `src/pages/PaymentSuccess.tsx` - Success page

### Backend

- `backend/server.js` - Express server with Stripe integration
- `backend/package.json` - Backend dependencies
- `backend/.env` - Backend environment variables

## 🛡️ Security Features

- All sensitive data is in environment variables (not committed to git)
- Webhook signature verification
- Amount validation on server side
- PCI compliant through Stripe
- Customer data encryption in transit

## 🌐 Production Deployment

### Frontend

- Deploy to Vercel, Netlify, or similar
- Update `VITE_API_URL` to your backend URL

### Backend

- Deploy to Railway, Heroku, AWS, or similar
- Update webhook URL in Stripe dashboard
- Set environment variables in hosting platform

## 🔍 Monitoring

The backend logs all payment events. Monitor:

- Payment successes/failures
- Webhook events
- Error logs

## 📞 Support

For Stripe-related issues:

- Check Stripe Dashboard for payment details
- Review webhook logs for event processing
- Monitor server logs for errors

## 🔄 Next Steps

1. **Add Order Management**: Store orders in database
2. **Email Notifications**: Send confirmation emails
3. **Inventory Management**: Update stock levels
4. **Multiple Payment Methods**: Add Apple Pay, Google Pay
5. **Subscription Support**: For recurring orders
