// api/webhook.ts (modified)
import type { VercelRequest, VercelResponse } from '@vercel/node'
import Stripe from 'stripe'
import fs from 'fs'
import path from 'path'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16',
})
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET

export const config = {
  api: { bodyParser: false },
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const chunks: Buffer[] = []
  for await (const chunk of req) {
    chunks.push(Buffer.from(chunk))
  }
  const rawBody = Buffer.concat(chunks).toString('utf8')
  const sig = req.headers['stripe-signature'] as string

  try {
    const event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret!)

    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object as Stripe.PaymentIntent
      const email = paymentIntent.receipt_email || 'unknown'

      // Load current list
      const filePath = path.join(process.cwd(), 'data/vaultAccess.json')
      const current = fs.existsSync(filePath)
        ? JSON.parse(fs.readFileSync(filePath, 'utf8'))
        : []

      // Add new entry
      current.push({
        email,
        time: new Date().toISOString(),
        paymentIntentId: paymentIntent.id,
      })

      fs.writeFileSync(filePath, JSON.stringify(current, null, 2))

      console.log(`✅ Vault access granted to: ${email}`)
    }

    res.status(200).send('ok')
  } catch (err: any) {
    console.error('Webhook Error:', err.message)
    res.status(400).send(`Webhook Error: ${err.message}`)
  }
}

