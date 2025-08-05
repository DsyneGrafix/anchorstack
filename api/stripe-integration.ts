// src/lib/stripe.ts - Stripe client setup
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY!)

export { stripePromise }

// src/components/PurchaseButton.tsx - Smart purchase component
import React, { useState } from 'react'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { Loader2, CreditCard, Download, Crown, Gift } from 'lucide-react'
import type { VaultProduct } from '@/types'

interface PurchaseButtonProps {
  product: VaultProduct
  onPurchaseComplete?: () => void
}

export const PurchaseButton: React.FC<PurchaseButtonProps> = ({ 
  product, 
  onPurchaseComplete 
}) => {
  const stripe = useStripe()
  const elements = useElements()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Check if user already owns this product
  const userOwnsProduct = checkUserOwnership(product.id) // Implement this

  const handlePurchase = async () => {
    if (!stripe || !elements) return

    setIsLoading(true)
    setError(null)

    try {
      // Create payment intent on your backend
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          amount: getProductPrice(product), // Define pricing
        }),
      })

      const { clientSecret } = await response.json()

      // Confirm payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
        }
      })

      if (result.error) {
        setError(result.error.message || 'Payment failed')
      } else {
        // Payment successful - grant access
        await grantProductAccess(product.id)
        onPurchaseComplete?.()
      }
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleFreeDownload = () => {
    // Track free download
    trackFreeDownload(product.id)
    window.open(product.url, '_blank')
  }

  // Free products - direct download
  if (product.tier === 'free') {
    return (
      <Button 
        onClick={handleFreeDownload}
        className="w-full bg-green-600 hover:bg-green-700"
      >
        <Gift className="w-4 h-4 mr-2" />
        Free Download
      </Button>
    )
  }

  // User already owns product
  if (userOwnsProduct) {
    return (
      <Button 
        onClick={() => window.open(product.url, '_blank')}
        className="w-full bg-blue-600 hover:bg-blue-700"
      >
        <Download className="w-4 h-4 mr-2" />
        Access Product
      </Button>
    )
  }

  // Premium/Exclusive products - require purchase
  return (
    <div className="space-y-4">
      <div className="text-center">
        <div className="text-2xl font-bold text-anchor-900">
          ${getProductPrice(product)}
        </div>
        <div className="text-sm text-anchor-600">
          One-time purchase • Lifetime access
        </div>
      </div>

      {error && (
        <div className="text-red-600 text-sm text-center">{error}</div>
      )}

      <Card className="p-4">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': { color: '#aab7c4' },
              },
            },
          }}
        />
      </Card>

      <Button 
        onClick={handlePurchase}
        disabled={!stripe || isLoading}
        className={`w-full ${
          product.tier === 'exclusive' 
            ? 'bg-purple-600 hover:bg-purple-700' 
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        ) : product.tier === 'exclusive' ? (
          <Crown className="w-4 h-4 mr-2" />
        ) : (
          <CreditCard className="w-4 h-4 mr-2" />
        )}
        {isLoading ? 'Processing...' : `Purchase ${product.title}`}
      </Button>
    </div>
  )
}

// Utility functions (implement these)
function checkUserOwnership(productId: string): boolean {
  // Check localStorage or API for user's owned products
  const ownedProducts = JSON.parse(localStorage.getItem('ownedProducts') || '[]')
  return ownedProducts.includes(productId)
}

function getProductPrice(product: VaultProduct): number {
  // Define your pricing structure
  const pricing = {
    'digital-distraction-cleanse': 29,
    'notion-creator-os': 39,
    'visual-brand-identity': 49,
    'creator-flywheel': 97,
    'audience-growth-accelerator': 127,
    'revenue-optimization': 147,
  }
  return pricing[product.id as keyof typeof pricing] || 39
}

async function grantProductAccess(productId: string) {
  // Add to user's owned products
  const ownedProducts = JSON.parse(localStorage.getItem('ownedProducts') || '[]')
  ownedProducts.push(productId)
  localStorage.setItem('ownedProducts', JSON.stringify(ownedProducts))
  
  // You'll want to also sync this with your backend/database
}

function trackFreeDownload(productId: string) {
  // Analytics tracking
  console.log(`Free download: ${productId}`)
}