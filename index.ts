// server.ts
import express from 'express'
import Stripe from 'stripe'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'

dotenv.config()
const app = express()
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-08-16',
})

app.use(bodyParser.raw({ type: 'application/json' }))

app.post('/api/webhook', (req, res) => {
  const sig = req.headers['stripe-signature'] as string
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  let event
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret!)
  } catch (err: any) {
    console.error('Webhook Error:', err.message)
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }

  // Handle events
  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object as Stripe.PaymentIntent
    console.log('💰 Payment succeeded:', paymentIntent.id)
  }

  res.status(200).send('Event received')
})

app.listen(3000, () => console.log('🚀 Server running on port 3000'))

