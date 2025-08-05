// Backend API routes for Stripe integration
// This can be deployed to Vercel/Netlify Functions or your preferred backend

// api/create-payment-intent.js (Vercel/Netlify function)
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { productId, amount } = req.body

    // Validate the product and amount
    const validProducts = {
      'digital-distraction-cleanse': 2900, // $29.00 in cents
      'notion-creator-os': 3900,
      'visual-brand-identity': 4900,
      'creator-flywheel': 9700,
      'audience-growth-accelerator': 12700,
      'revenue-optimization': 14700,
    }

    if (!validProducts[productId] || validProducts[productId] !== amount * 100) {
      return res.status(400).json({ error: 'Invalid product or amount' })
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: validProducts[productId],
      currency: 'usd',
      metadata: {
        productId,
        source: 'anchorstack-vault'
      },
      description: `AnchorStack Product: ${productId}`,
    })

    res.status(200).json({
      clientSecret: paymentIntent.client_secret
    })
  } catch (error) {
    console.error('Error creating payment intent:', error)
    res.status(500).json({ error: 'Failed to create payment intent' })
  }
}

// api/webhook.js - Handle Stripe webhooks for successful payments
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const sig = req.headers['stripe-signature']
  let event

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message)
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }

  // Handle successful payment
  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object
    const { productId } = paymentIntent.metadata

    // Here you would:
    // 1. Store the purchase in your database
    // 2. Send confirmation email with download links
    // 3. Grant access to the user
    
    console.log(`Payment successful for product: ${productId}`)
    
    // For now, log it. In production, update your user database
    await recordPurchase({
      productId,
      paymentIntentId: paymentIntent.id,
      amount: paymentIntent.amount,
      customerEmail: paymentIntent.receipt_email
    })
  }

  res.status(200).json({ received: true })
}

// Utility function to record purchase (implement with your database)
async function recordPurchase(purchaseData) {
  // This would connect to your database (Supabase, Firebase, etc.)
  // For MVP, you could even use a simple JSON file or Airtable
  console.log('Recording purchase:', purchaseData)
  
  // Example with local storage simulation:
  // In production, this would be a proper database operation
}