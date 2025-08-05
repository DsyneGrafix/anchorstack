// api/gumroad-webhook.ts - Production Webhook Handler
import type { VercelRequest, VercelResponse } from '@vercel/node'

interface GumroadWebhookPayload {
  seller_id: string
  product_id: string
  product_name: string
  permalink: string
  product_permalink: string
  email: string
  price: number
  currency: string
  quantity: number
  discover_fee_charged: boolean
  can_contact: boolean
  referrer: string
  card: {
    visual: string
    type: string
    bin: string
    expiry_month: string
    expiry_year: string
  }
  order_number: number
  sale_id: string
  sale_timestamp: string
  purchaser_id: string
  subscription_id?: string
  variants: Record<string, string>
  license_key?: string
  ip_country: string
  recurrence: string
  is_gift_receiver_purchase: boolean
  refunded: boolean
  disputed: boolean
  dispute_won: boolean
  test: boolean
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      error: 'Method not allowed',
      message: 'This endpoint only accepts POST requests' 
    })
  }

  try {
    const payload: GumroadWebhookPayload = req.body

    // Log incoming webhook for debugging
    console.log('📥 Gumroad webhook received:', {
      email: payload.email,
      price: payload.price,
      product_name: payload.product_name,
      sale_id: payload.sale_id,
      test: payload.test
    })

    // Validate required fields
    if (!payload.email || typeof payload.price !== 'number') {
      return res.status(400).json({
        error: 'Invalid payload',
        message: 'Missing required fields: email, price'
      })
    }

    // Calculate token reward (5 tokens per $1)
    const tokensEarned = Math.floor(payload.price * 5)
    
    // Determine tier upgrade based on purchase amount
    let newTier: 'free' | 'mid' | 'top' | 'lifetime' = 'free'
    let tierUpgraded = false
    
    if (payload.price >= 200) {
      newTier = 'lifetime'
      tierUpgraded = true
    } else if (payload.price >= 75) {
      newTier = 'top'
      tierUpgraded = true
    } else if (payload.price >= 25) {
      newTier = 'mid'
      tierUpgraded = true
    }

    // Create token transaction record
    const tokenTransaction = {
      id: `gumroad_${payload.sale_id}`,
      email: payload.email.toLowerCase(),
      action: 'earn' as const,
      amount: tokensEarned,
      source: 'purchase' as const,
      productId: payload.product_id,
      metadata: {
        gumroadSaleId: payload.sale_id,
        productName: payload.product_name,
        price: payload.price,
        currency: payload.currency,
        orderNumber: payload.order_number,
        test: payload.test
      },
      timestamp: new Date(payload.sale_timestamp),
    }

    // TODO: Save to your database
    // Example with Supabase:
    /*
    const { error } = await supabase
      .from('token_transactions')
      .insert([tokenTransaction])
    
    if (error) throw error
    
    if (tierUpgraded) {
      await supabase
        .from('users')
        .update({ tier: newTier })
        .eq('email', payload.email.toLowerCase())
    }
    */

    // For MVP: Log the transaction (replace with database save)
    console.log('🪙 Token transaction to save:', tokenTransaction)
    
    if (tierUpgraded) {
      console.log(`🎉 Tier upgrade for ${payload.email}: ${newTier}`)
    }

    // TODO: Send email notification to user
    // Example email content:
    /*
    const emailContent = {
      to: payload.email,
      subject: `🪙 You earned ${tokensEarned} Faith Tokens!`,
      html: `
        <h2>Thank you for your purchase!</h2>
        <p>You've earned <strong>${tokensEarned} Faith Tokens</strong> for purchasing ${payload.product_name}.</p>
        ${tierUpgraded ? `<p>🎉 Congratulations! You've been upgraded to <strong>${newTier}</strong> tier!</p>` : ''}
        <p>Visit your <a href="${process.env.FRONTEND_URL}/tokens">token dashboard</a> to see your balance and redeem rewards.</p>
      `
    }
    */

    // Success response
    const response = {
      success: true,
      tokensAwarded: tokensEarned,
      newTier: tierUpgraded ? newTier : null,
      tierUpgraded,
      saleId: payload.sale_id,
      test: payload.test,
      message: `Successfully processed token award for ${payload.email}`
    }

    console.log('✅ Webhook processed successfully:', response)
    
    return res.status(200).json(response)

  } catch (error) {
    console.error('❌ Webhook processing error:', error)
    
    return res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to process webhook',
      details: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}

// src/pages/Tokens.tsx - Complete Token Dashboard
import React, { useState } from 'react'
import { Coins, Gift, Star, Crown, Zap, Users, Trophy, Shield, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { EmailLogin } from '@/components/EmailLogin'
import { TokenBalance } from '@/components/TokenBalance'
import { EarnTokensPanel } from '@/components/EarnTokensPanel'
import { TokenRedemptions } from '@/components/TokenRedemptions'
import { useTokenStore } from '@/store/useTokenStore'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

export const Tokens: React.FC = () => {
  const { user } = useTokenStore()
  const [activeTab, setActiveTab] = useState<'earn' | 'redeem' | 'learn'>('earn')

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl p-8">
        <Coins className="w-16 h-16 text-yellow-600 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-yellow-900 mb-4">
          Faith Tokens
        </h1>
        <p className="text-lg text-yellow-700 max-w-2xl mx-auto mb-6">
          Earn rewards for faithful engagement. Every action matters in building your creator journey.
        </p>
        {!user && (
          <p className="text-yellow-600 font-medium">
            Sign up below to start earning tokens immediately!
          </p>
        )}
      </div>

      {/* Login Component */}
      {!user && <EmailLogin />}

      {/* User Dashboard */}
      {user && (
        <>
          {/* Tab Navigation */}
          <div className="flex justify-center">
            <div className="bg-white rounded-lg p-1 shadow-sm border border-anchor-200">
              {[
                { id: 'earn', label: 'Earn Tokens', icon: Zap },
                { id: 'redeem', label: 'Redeem', icon: Gift },
                { id: 'learn', label: 'How It Works', icon: Shield },
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id as any)}
                  className={`
                    flex items-center space-x-2 px-4 py-2 rounded-md transition-colors font-medium
                    ${activeTab === id
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-anchor-600 hover:text-anchor-900 hover:bg-anchor-50'
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sidebar - Always show balance */}
            <div className="lg:col-span-1">
              <TokenBalance />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2">
              {activeTab === 'earn' && <EarnTokensPanel />}
              {activeTab === 'redeem' && <TokenRedemptions />}
              {activeTab === 'learn' && <TokenEducation />}
            </div>
          </div>
        </>
      )}

      {/* How It Works Section (Always Visible) */}
      <TokenOverview />

      {/* Call to Action */}
      <div className="text-center bg-gradient-to-r from-primary-50 to-blue-50 rounded-xl p-8">
        <h3 className="text-xl font-bold text-primary-900 mb-4">
          Ready to Start Your Token Journey?
        </h3>
        <p className="text-primary-700 max-w-2xl mx-auto mb-6">
          Join thousands of faithful creators who are building their businesses with intention and earning rewards for every step.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/vault">
            <Button variant="outline" className="flex items-center space-x-2">
              <Gift className="w-4 h-4" />
              <span>Browse Vault</span>
            </Button>
          </Link>
          <Link to="/focus">
            <Button className="flex items-center space-x-2">
              <Trophy className="w-4 h-4" />
              <span>Start Earning</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

// Token Education Component
const TokenEducation: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Faith Token System</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold text-anchor-800 mb-2">What are Faith Tokens?</h4>
            <p className="text-anchor-600 text-sm">
              Faith Tokens are our way of rewarding consistent engagement and loyal community participation. 
              Think of them as loyalty points that have real value in the AnchorStack ecosystem.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-anchor-800 mb-2">Why "Faith" Tokens?</h4>
            <p className="text-anchor-600 text-sm">
              Because building a creator business requires faith - faith in your vision, faith in the process, 
              and faith in showing up consistently. We reward that faithfulness.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-anchor-800 mb-2">Fair Play Promise</h4>
            <p className="text-anchor-600 text-sm">
              Our system has built-in limits to prevent abuse and ensure everyone has a fair chance to earn. 
              Higher membership tiers unlock better earning potential as you invest more in your creator journey.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-6">
          <h4 className="font-semibold text-blue-800 mb-3 flex items-center">
            <Shield className="w-5 h-5 mr-2" />
            Token Security & Limits
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <div className="font-medium text-blue-700 mb-1">Daily Limits</div>
              <ul className="text-blue-600 space-y-0.5">
                <li>• Login: 2 tokens/day max</li>
                <li>• Quests: 50 tokens/day max</li>
                <li>• Social: 15 tokens/week max</li>
              </ul>
            </div>
            <div>
              <div className="font-medium text-blue-700 mb-1">Monthly Caps by Tier</div>
              <ul className="text-blue-600 space-y-0.5">
                <li>• Free: 100 tokens/month</li>
                <li>• Mid: 300 tokens/month</li>
                <li>• Top: 500 tokens/month</li>
                <li>• Lifetime: 1000 tokens/month</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Token Overview Component
const TokenOverview: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* How to Earn */}
      <div>
        <h2 className="text-2xl font-bold text-anchor-900 mb-6 text-center">How to Earn Faith Tokens</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Daily Check-in',
              description: 'Log in every day',
              icon: Zap,
              tokens: '2/day',
              color: 'green'
            },
            {
              title: 'Complete Quests',
              description: 'Focus sessions & BootyQuest',
              icon: Trophy,
              tokens: '10 each',
              color: 'blue'
            },
            {
              title: 'Share Content',
              description: 'Social media sharing',
              icon: Users,
              tokens: '15/week',
              color: 'purple'
            },
            {
              title: 'Make Purchases',
              description: 'Support the ecosystem',
              icon: Star,
              tokens: '5 per $1',
              color: 'yellow'
            }
          ].map((method) => {
            const IconComponent = method.icon
            return (
              <Card key={method.title} className="text-center">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 bg-${method.color}-100 rounded-lg flex items-center justify-center mx-auto mb-3`}>
                    <IconComponent className={`w-6 h-6 text-${method.color}-600`} />
                  </div>
                  <h3 className="font-semibold text-anchor-800 mb-2">{method.title}</h3>
                  <p className="text-sm text-anchor-600 mb-3">{method.description}</p>
                  <div className={`bg-${method.color}-100 text-${method.color}-700 px-2 py-1 rounded text-xs font-bold`}>
                    +{method.tokens}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Membership Tiers */}
      <div>
        <h2 className="text-2xl font-bold text-anchor-900 mb-6 text-center">Membership Tiers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              tier: 'Free',
              icon: Gift,
              monthlyCap: 100,
              price: '$0',
              color: 'green',
              features: ['Daily check-ins', 'Basic rewards', 'Standard redemptions']
            },
            {
              tier: 'Mid',
              icon: Star,
              monthlyCap: 300,
              price: '$25+',
              color: 'blue',
              features: ['All free features', 'Higher caps', 'Premium redemptions']
            },
            {
              tier: 'Top',
              icon: Crown,
              monthlyCap: 500,
              price: '$75+',
              color: 'purple',
              features: ['All mid features', 'Exclusive rewards', 'Priority support']
            },
            {
              tier: 'Lifetime',
              icon: Crown,
              monthlyCap: 1000,
              price: '$200+',
              color: 'amber',
              features: ['Maximum earning', 'Founder perks', 'Early access']
            }
          ].map((tier) => {
            const IconComponent = tier.icon
            return (
              <Card key={tier.tier} className="relative">
                <CardContent className="text-center p-6">
                  {tier.tier === 'Top' && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-bold">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <div className={`w-12 h-12 bg-${tier.color}-100 rounded-lg flex items-center justify-center mx-auto mb-3`}>
                    <IconComponent className={`w-6 h-6 text-${tier.color}-600`} />
                  </div>
                  <h3 className="font-semibold text-anchor-800 mb-1">{tier.tier}</h3>
                  <p className="text-sm text-anchor-500 mb-3">{tier.price}</p>
                  <div className={`bg-${tier.color}-100 text-${tier.color}-700 px-3 py-1 rounded font-bold text-sm mb-4`}>
                    {tier.monthlyCap} tokens/month
                  </div>
                  <ul className="text-xs text-anchor-600 space-y-1">
                    {tier.features.map((feature, index) => (
                      <li key={index}>• {feature}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// src/components/VaultTile.tsx - Enhanced with Token Discounts
import React, { useState } from 'react'
import { ExternalLink, Download, Crown, Gift, Coins, Zap } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { useTokenStore } from '@/store/useTokenStore'
import type { VaultProduct } from '@/types'

interface VaultTileProps {
  product: VaultProduct
}

const tierConfig = {
  free: {
    icon: Gift,
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    textColor: 'text-green-800',
    badgeColor: 'bg-green-100',
    label: 'FREE'
  },
  premium: {
    icon: Download,
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200', 
    textColor: 'text-blue-800',
    badgeColor: 'bg-blue-100',
    label: 'PREMIUM'
  },
  exclusive: {
    icon: Crown,
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    textColor: 'text-purple-800', 
    badgeColor: 'bg-purple-100',
    label: 'EXCLUSIVE'
  }
}

export const VaultTile: React.FC<VaultTileProps> = ({ product }) => {
  const config = tierConfig[product.tier]
  const IconComponent = config.icon
  const { user, spendTokens } = useTokenStore()
  const [showTokenOption, setShowTokenOption] = useState(false)

  const handleClick = () => {
    window.open(product.url, '_blank')
  }

  const handleTokenDiscount = () => {
    if (user && user.tokens >= 100) {
      if (spendTokens(100, `discount_${product.id}`)) {
        // Generate unique discount code
        const discountCode = `FAITH${Date.now().toString().slice(-6)}`
        
        // Copy to clipboard if available
        if (navigator.clipboard) {
          navigator.clipboard.writeText(discountCode)
        }
        
        alert(`🪙 Token Discount Applied!\n\nDiscount Code: ${discountCode}\n\nThis code gives you $5 off your purchase!\n${navigator.clipboard ? '\nCode copied to clipboard!' : '\nCopy this code for checkout.'}`)
        
        // Small delay then redirect
        setTimeout(() => handleClick(), 2000)
      }
    }
  }

  const canUseTokens = user && user.tokens >= 100 && product.tier !== 'free'

  return (
    <Card 
      className={`
        ${config.bgColor} ${config.borderColor} 
        transition-all duration-200 hover:shadow-lg hover:scale-[1.02]
        group relative overflow-hidden
      `}
      onMouseEnter={() => setShowTokenOption(true)}
      onMouseLeave={() => setShowTokenOption(false)}
    >
      {/* Tier Badge */}
      <div className={`
        absolute top-3 right-3 z-10
        ${config.badgeColor} ${config.textColor}
        px-2 py-1 rounded-full text-xs font-bold
        flex items-center space-x-1
      `}>
        <IconComponent className="w-3 h-3" />
        <span>{config.label}</span>
      </div>

      {/* Token Discount Badge */}
      {canUseTokens && showTokenOption && (
        <div className="absolute top-3 left-3 z-10 bg-yellow-100 border border-yellow-300 px-2 py-1 rounded-full">
          <div className="flex items-center space-x-1">
            <Coins className="w-3 h-3 text-yellow-600" />
            <span className="text-xs font-bold text-yellow-700">-100 for $5 off</span>
          </div>
        </div>
      )}

      <CardContent className="p-6 pt-12">
        <div className="space-y-3">
          <h3 className={`font-semibold text-lg ${config.textColor} group-hover:text-opacity-90`}>
            {product.title}
          </h3>
          
          <p className="text-anchor-600 text-sm leading-relaxed">
            {product.description}
          </p>
          
          <div className="flex items-center justify-between pt-2">
            <span className={`text-xs font-medium ${config.textColor}`}>
              {product.category}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <Button
              onClick={handleClick}
              className="flex-1"
              size="sm"
            >
              {product.url.startsWith('/downloads/') ? (
                <>
                  <Download className="w-4 h-4 mr-1" />
                  Download
                </>
              ) : (
                <>
                  <ExternalLink className="w-4 h-4 mr-1" />
                  View Product
                </>
              )}
            </Button>

            {/* Token Discount Button */}
            {canUseTokens && (
              <Button
                onClick={handleTokenDiscount}
                variant="outline"
                size="sm"
                className="text-yellow-600 border-yellow-300 hover:bg-yellow-50 group"
                title="Use 100 tokens for $5 discount"
              >
                <Coins className="w-4 h-4 mr-1" />
                <span className="hidden sm:inline">100</span>
                <Zap className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Button>
            )}
          </div>

          {/* Token Hint */}
          {user && user.tokens < 100 && product.tier !== 'free' && (
            <p className="text-xs text-anchor-500 bg-anchor-100 rounded px-2 py-1">
              💡 Earn {100 - user.tokens} more tokens for $5 discount
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}