// src/components/TokenBalance.tsx - Production UI Component
import React from 'react'
import { Coins, TrendingUp, Calendar, Crown, Gift, Star } from 'lucide-react'
import { useTokenStore } from '@/store/useTokenStore'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export const TokenBalance: React.FC = () => {
  const { user, transactions, getMonthlyEarned } = useTokenStore()

  if (!user) return null

  const monthlyEarned = getMonthlyEarned()
  const MONTHLY_CAP = {
    free: 100,
    mid: 300,
    top: 500,
    lifetime: 1000,
  }[user.tier]

  const recentTransactions = transactions
    .filter(t => t.email === user.email)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 5)

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'free': return Gift
      case 'mid': return Star
      case 'top': return Crown
      case 'lifetime': return Crown
      default: return Gift
    }
  }

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'free': return 'text-green-600'
      case 'mid': return 'text-blue-600'
      case 'top': return 'text-purple-600'
      case 'lifetime': return 'text-gold-600'
      default: return 'text-green-600'
    }
  }

  const TierIcon = getTierIcon(user.tier)

  return (
    <div className="space-y-4">
      {/* Main Balance Card */}
      <Card className="bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Coins className="w-8 h-8 text-yellow-600" />
                <TierIcon className={`w-4 h-4 ${getTierColor(user.tier)} absolute -top-1 -right-1`} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-yellow-800">Faith Tokens</h3>
                <p className="text-xs text-yellow-600 capitalize">{user.tier} Member</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-yellow-900">
                {user.tokens.toLocaleString()}
              </div>
              <div className="text-sm text-yellow-700">Available</div>
            </div>
          </div>

          {/* Monthly Progress */}
          <div className="bg-yellow-100 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-yellow-800">This Month</span>
              <span className="text-sm text-yellow-700">{monthlyEarned} / {MONTHLY_CAP}</span>
            </div>
            <div className="w-full bg-yellow-200 rounded-full h-2">
              <div 
                className="bg-yellow-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${Math.min((monthlyEarned / MONTHLY_CAP) * 100, 100)}%` }}
              />
            </div>
            {monthlyEarned >= MONTHLY_CAP && (
              <p className="text-xs text-yellow-600 mt-1">Monthly earning limit reached</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      {recentTransactions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-base">
              <TrendingUp className="w-4 h-4" />
              <span>Recent Activity</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between py-2 border-b border-anchor-100 last:border-b-0">
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${
                      transaction.action === 'earn' ? 'bg-green-500' : 'bg-red-500'
                    }`} />
                    <div>
                      <span className="text-sm font-medium capitalize">{transaction.source.replace('_', ' ')}</span>
                      {transaction.productId && (
                        <p className="text-xs text-anchor-500">• {transaction.productId}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`font-bold text-sm ${
                      transaction.action === 'earn' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.action === 'earn' ? '+' : '-'}{transaction.amount}
                    </span>
                    <span className="text-xs text-anchor-400">
                      {new Date(transaction.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

// src/components/QuickTokenActions.tsx - Dashboard Widget
import React from 'react'
import { Clock, Share2, Gamepad2, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTokenStore } from '@/store/useTokenStore'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/Button'

export const QuickTokenActions: React.FC = () => {
  const { user, addTokens, canEarn } = useTokenStore()

  if (!user) return null

  const quickActions = [
    {
      id: 'login',
      title: 'Daily Check-in',
      tokens: 2,
      icon: Clock,
      canEarn: canEarn('login'),
      action: () => addTokens(2, 'login')
    },
    {
      id: 'social',
      title: 'Share AnchorStack',
      tokens: 15,
      icon: Share2,
      canEarn: canEarn('social'),
      action: () => {
        const text = 'Building my creator business with AnchorStack 🎯 The faith-based productivity system that actually works!'
        const url = window.location.origin
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank')
        addTokens(15, 'social')
      }
    }
  ]

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-anchor-800">Quick Actions</h3>
          <Link to="/tokens" className="text-primary-600 hover:text-primary-700 text-sm flex items-center space-x-1">
            <span>View All</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        
        <div className="space-y-2">
          {quickActions.map((action) => {
            const IconComponent = action.icon
            return (
              <button
                key={action.id}
                onClick={action.action}
                disabled={!action.canEarn}
                className={`
                  w-full flex items-center justify-between p-3 rounded-lg border transition-colors text-left
                  ${action.canEarn 
                    ? 'border-green-200 bg-green-50 hover:bg-green-100' 
                    : 'border-gray-200 bg-gray-50 cursor-not-allowed'
                  }
                `}
              >
                <div className="flex items-center space-x-2">
                  <IconComponent className={`w-4 h-4 ${action.canEarn ? 'text-green-600' : 'text-gray-400'}`} />
                  <span className={`text-sm font-medium ${action.canEarn ? 'text-green-800' : 'text-gray-600'}`}>
                    {action.title}
                  </span>
                </div>
                <span className={`text-xs font-bold ${action.canEarn ? 'text-green-600' : 'text-gray-400'}`}>
                  +{action.tokens}
                </span>
              </button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

// src/components/TokenRedemptions.tsx - Vault Integration
import React, { useState } from 'react'
import { ShoppingCart, Download, Trophy, Zap } from 'lucide-react'
import { useTokenStore } from '@/store/useTokenStore'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/Button'

interface RedemptionOption {
  id: string
  title: string
  description: string
  cost: number
  icon: any
  action: () => Promise<boolean>
  minTier?: 'free' | 'mid' | 'top' | 'lifetime'
}

export const TokenRedemptions: React.FC = () => {
  const { user, spendTokens } = useTokenStore()
  const [redeeming, setRedeeming] = useState<string | null>(null)

  if (!user) return null

  const redemptions: RedemptionOption[] = [
    {
      id: 'discount5',
      title: '$5 Off Next Order',
      description: 'Get $5 discount on orders over $20',
      cost: 100,
      icon: ShoppingCart,
      action: async () => {
        const couponCode = `FAITH${Date.now().toString().slice(-6)}`
        
        // Copy to clipboard if available
        if (navigator.clipboard) {
          await navigator.clipboard.writeText(couponCode)
        }
        
        alert(`🎉 Coupon Code Generated!\n\nCode: ${couponCode}\n\nThis code gives you $5 off orders over $20. ${navigator.clipboard ? 'Code copied to clipboard!' : 'Copy this code to use at checkout.'}`)
        
        return spendTokens(100, 'discount_5_dollar')
      }
    },
    {
      id: 'vault_unlock',
      title: 'Unlock Premium Resource',
      description: 'Access a curated premium template or guide',
      cost: 150,
      icon: Download,
      action: async () => {
        alert('🎁 Premium unlock coming soon! This feature will let you access exclusive vault content.')
        return spendTokens(150, 'vault_unlock')
      }
    },
    {
      id: 'giveaway_entry',
      title: 'Monthly Giveaway Entry',
      description: 'Enter to win $50 product bundle',
      cost: 50,
      icon: Trophy,
      action: async () => {
        alert('🏆 You\'re entered in this month\'s giveaway!\n\nWinner announced on the 1st of next month. Good luck!')
        return spendTokens(50, 'giveaway_entry')
      }
    },
    {
      id: 'boost_tokens',
      title: '2x Token Weekend',
      description: 'Double your earning rate for 48 hours',
      cost: 200,
      icon: Zap,
      minTier: 'mid',
      action: async () => {
        alert('⚡ 2x Token Boost Activated!\n\nYou\'ll earn double tokens for the next 48 hours!')
        return spendTokens(200, 'token_boost_48h')
      }
    }
  ]

  const handleRedeem = async (redemption: RedemptionOption) => {
    if (user.tokens < redemption.cost) return
    if (redemption.minTier && getTierLevel(user.tier) < getTierLevel(redemption.minTier)) return
    
    setRedeeming(redemption.id)
    
    try {
      const success = await redemption.action()
      if (!success) {
        alert('Something went wrong with the redemption. Please try again.')
      }
    } catch (error) {
      alert('Something went wrong. Please try again.')
    } finally {
      setRedeeming(null)
    }
  }

  const getTierLevel = (tier: string): number => {
    const levels = { free: 0, mid: 1, top: 2, lifetime: 3 }
    return levels[tier as keyof typeof levels] || 0
  }

  const canRedeem = (redemption: RedemptionOption): boolean => {
    const hasTokens = user.tokens >= redemption.cost
    const hasTier = !redemption.minTier || getTierLevel(user.tier) >= getTierLevel(redemption.minTier)
    return hasTokens && hasTier
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Redeem Tokens</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {redemptions.map((redemption) => {
            const IconComponent = redemption.icon
            const canRedeemThis = canRedeem(redemption)
            const isRedeeming = redeeming === redemption.id
            
            return (
              <div key={redemption.id} className={`
                flex items-center justify-between p-4 rounded-lg border transition-colors
                ${canRedeemThis ? 'border-blue-200 bg-blue-50' : 'border-gray-200 bg-gray-50'}
              `}>
                <div className="flex items-center space-x-3">
                  <IconComponent className={`w-5 h-5 ${
                    canRedeemThis ? 'text-blue-600' : 'text-gray-400'
                  }`} />
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className={`font-medium ${
                        canRedeemThis ? 'text-blue-800' : 'text-gray-600'
                      }`}>
                        {redemption.title}
                      </h4>
                      {redemption.minTier && (
                        <span className="text-xs bg-purple-100 text-purple-600 px-2 py-0.5 rounded">
                          {redemption.minTier}+ only
                        </span>
                      )}
                    </div>
                    <p className={`text-sm ${
                      canRedeemThis ? 'text-blue-600' : 'text-gray-500'
                    }`}>
                      {redemption.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`font-bold ${
                    canRedeemThis ? 'text-blue-600' : 'text-gray-400'
                  }`}>
                    {redemption.cost} tokens
                  </span>
                  <Button
                    onClick={() => handleRedeem(redemption)}
                    disabled={!canRedeemThis || isRedeeming}
                    size="sm"
                    variant={canRedeemThis ? 'default' : 'outline'}
                  >
                    {isRedeeming ? 'Processing...' : canRedeemThis ? 'Redeem' : 'Cannot Redeem'}
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

// api/gumroad-webhook.ts - Vercel/Netlify Function
export default async function handler(req: any, res: any) {
  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const {
      email,
      price,
      product_id,
      product_name,
      sale_id,
      test
    } = req.body

    // Log the webhook for debugging
    console.log('Gumroad webhook received:', {
      email,
      price,
      product_id,
      product_name,
      sale_id,
      test
    })

    // Calculate tokens (5 per $1)
    const tokens = Math.floor(price * 5)
    
    // Determine tier upgrade based on purchase amount
    let newTier: 'free' | 'mid' | 'top' | 'lifetime' = 'free'
    if (price >= 200) newTier = 'lifetime'
    else if (price >= 75) newTier = 'top'
    else if (price >= 25) newTier = 'mid'

    // For MVP, we'll log this data
    // In production, you'd save to your database
    const tokenAward = {
      email,
      tokens,
      productId: product_id,
      productName: product_name,
      saleId: sale_id,
      newTier,
      timestamp: new Date().toISOString(),
      test: test || false
    }

    // TODO: Save to database (Supabase, Firebase, etc.)
    console.log('Token award to process:', tokenAward)

    // TODO: Send email notification to user about token award
    // TODO: Update user tier in database

    // For now, we'll return success
    // In production, you'd actually process the token award
    res.status(200).json({
      success: true,
      tokensAwarded: tokens,
      newTier,
      message: `Awarded ${tokens} tokens to ${email}`
    })

  } catch (error) {
    console.error('Webhook processing error:', error)
    res.status(500).json({ 
      error: 'Webhook processing failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}

// src/pages/HowTokensWork.tsx - Marketing/Education Page
import React from 'react'
import { Coins, Gift, Star, Crown, Zap, Shield, Users, Trophy } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/Button'
import { Link } from 'react-router-dom'

export const HowTokensWork: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl p-8">
        <Coins className="w-16 h-16 text-yellow-600 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-yellow-900 mb-4">
          Faith Tokens: Rewards for Faithful Creators
        </h1>
        <p className="text-lg text-yellow-700 max-w-2xl mx-auto mb-6">
          Our token system rewards engagement, loyalty, and community participation. 
          Earn tokens through daily actions and redeem them for real value.
        </p>
        <Link to="/tokens">
          <Button className="bg-yellow-600 hover:bg-yellow-700">
            Start Earning Tokens
          </Button>
        </Link>
      </div>

      {/* How to Earn */}
      <div>
        <h2 className="text-2xl font-bold text-anchor-900 mb-6 text-center">How to Earn Faith Tokens</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Daily Check-in',
              description: 'Log in every day to earn 2 tokens',
              icon: Zap,
              tokens: '2/day',
              color: 'green'
            },
            {
              title: 'Complete Quests',
              description: 'Finish BootyQuest challenges and focus sessions',
              icon: Trophy,
              tokens: '10 each',
              color: 'blue'
            },
            {
              title: 'Share Content',
              description: 'Share AnchorStack on social media',
              icon: Users,
              tokens: '15/week',
              color: 'purple'
            },
            {
              title: 'Make Purchases',
              description: 'Earn 5 tokens for every $1 spent',
              icon: Star,
              tokens: '5 per $1',
              color: 'yellow'
            }
          ].map((method) => {
            const IconComponent = method.icon
            return (
              <Card key={method.title} className={`bg-${method.color}-50 border-${method.color}-200`}>
                <CardContent className="text-center p-6">
                  <IconComponent className={`w-8 h-8 text-${method.color}-600 mx-auto mb-3`} />
                  <h3 className={`font-semibold text-${method.color}-800 mb-2`}>{method.title}</h3>
                  <p className={`text-sm text-${method.color}-600 mb-2`}>{method.description}</p>
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
              color: 'green',
              features: ['Daily check-ins', 'Basic quest rewards', 'Standard redemptions']
            },
            {
              tier: 'Mid',
              icon: Star,
              monthlyCap: 300,
              color: 'blue',
              features: ['All free features', 'Higher earning rates', 'Premium redemptions']
            },
            {
              tier: 'Top',
              icon: Crown,
              monthlyCap: 500,
              color: 'purple',
              features: ['All mid features', 'Exclusive rewards', 'Priority support']
            },
            {
              tier: 'Lifetime',
              icon: Crown,
              monthlyCap: 1000,
              color: 'gold',
              features: ['All top features', 'Maximum earning potential', 'Founder perks']
            }
          ].map((tier) => {
            const IconComponent = tier.icon
            return (
              <Card key={tier.tier} className={`bg-${tier.color}-50 border-${tier.color}-200`}>
                <CardContent className="text-center p-6">
                  <IconComponent className={`w-8 h-8 text-${tier.color}-600 mx-auto mb-3`} />
                  <h3 className={`font-semibold text-${tier.color}-800 mb-2`}>{tier.tier} Member</h3>
                  <div className={`bg-${tier.color}-100 text-${tier.color}-700 px-2 py-1 rounded text-sm font-bold mb-3`}>
                    {tier.monthlyCap} tokens/month
                  </div>
                  <ul className={`text-xs text-${tier.color}-600 space-y-1`}>
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

      {/* What You Can Redeem */}
      <div>
        <h2 className="text-2xl font-bold text-anchor-900 mb-6 text-center">Redeem for Real Value</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'Instant Discounts',
              description: '$5 off your next order with 100 tokens',
              cost: '100 tokens',
              icon: '💰'
            },
            {
              title: 'Premium Content',
              description: 'Unlock exclusive templates and resources',
              cost: '150 tokens',
              icon: '🎁'
            },
            {
              title: 'Giveaway Entries',
              description: 'Enter monthly drawings for product bundles',
              cost: '50 tokens',
              icon: '🏆'
            }
          ].map((redemption) => (
            <Card key={redemption.title}>
              <CardContent className="text-center p-6">
                <div className="text-4xl mb-3">{redemption.icon}</div>
                <h3 className="font-semibold text-anchor-800 mb-2">{redemption.title}</h3>
                <p className="text-sm text-anchor-600 mb-3">{redemption.description}</p>
                <div className="bg-primary-100 text-primary-700 px-3 py-1 rounded font-bold text-sm">
                  {redemption.cost}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Fair Play */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-8 text-center">
          <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-blue-900 mb-4">Fair Play Guarantee</h3>
          <p className="text-blue-700 max-w-2xl mx-auto mb-4">
            Our token system is designed to reward genuine engagement and prevent abuse. 
            We have daily, weekly, and monthly caps to ensure fairness for all members.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-white rounded-lg p-3">
              <div className="font-semibold text-blue-800">Daily Limits</div>
              <div className="text-blue-600">Prevent token farming</div>
            </div>
            <div className="bg-white rounded-lg p-3">
              <div className="font-semibold text-blue-800">Email Verified</div>
              <div className="text-blue-600">One account per person</div>
            </div>
            <div className="bg-white rounded-lg p-3">
              <div className="font-semibold text-blue-800">Tier Based</div>
              <div className="text-blue-600">Higher tiers = better rewards</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CTA */}
      <div className="text-center">
        <Link to="/tokens">
          <Button size="lg" className="bg-primary-600 hover:bg-primary-700">
            Start Earning Faith Tokens Today
          </Button>
        </Link>
      </div>
    </div>
  )
}