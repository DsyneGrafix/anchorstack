// src/types/token.ts
import TokenInfo from '@/pages/TokenInfo'

export interface TokenTransaction {
  id: string
  email: string
  action: 'earn' | 'spend'
  amount: number
  source: 'purchase' | 'login' | 'quest' | 'social' | 'testimonial' | 'manual'
  productId?: string
  metadata?: Record<string, any>
  timestamp: Date
}

export interface TokenBalance {
  email: string
  total: number
  lifetime: number
  lastUpdated: Date
  tier: 'free' | 'mid' | 'top' | 'lifetime'
  verified: boolean
}

export interface User {
  email: string
  joinDate: Date
  tier: 'free' | 'mid' | 'top' | 'lifetime'
  verified: boolean
  tokens: number
  purchaseHistory: string[]
  lastLogin?: Date
}

// src/store/useTokenStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { TokenTransaction, TokenBalance, User } from '@/types/token'

interface TokenStore {
  user: User | null
  transactions: TokenTransaction[]
  setUser: (user: User) => void
  addTokens: (amount: number, source: TokenTransaction['source'], productId?: string) => void
  spendTokens: (amount: number, purpose: string) => boolean
  getMonthlyEarned: () => number
  canEarn: (source: TokenTransaction['source']) => boolean
  syncWithCloud: () => Promise<void>
}

const TOKEN_RATES = {
  purchase: 5, // per $1 spent
  login: 2, // daily max
  quest: 10, // per completion
  social: 15, // weekly max
  testimonial: 25, // once ever
}

const MONTHLY_CAPS = {
  free: 100,
  mid: 300,
  top: 500,
  lifetime: 1000,
}

const DAILY_LIMITS = {
  login: 2, // max 2 tokens per day for login
  quest: 50, // max 50 tokens per day from quests
}

export const useTokenStore = create<TokenStore>()(
  persist(
    (set, get) => ({
      user: null,
      transactions: [],

      setUser: (user: User) => {
        set({ user })
      },

      addTokens: (amount: number, source: TokenTransaction['source'], productId?: string) => {
        const { user, transactions, canEarn } = get()
        
        if (!user || !canEarn(source)) return

        const transaction: TokenTransaction = {
          id: crypto.randomUUID(),
          email: user.email,
          action: 'earn',
          amount,
          source,
          productId,
          timestamp: new Date(),
        }

        set(state => ({
          user: {
            ...state.user!,
            tokens: state.user!.tokens + amount,
          },
          transactions: [...state.transactions, transaction],
        }))
      },

      spendTokens: (amount: number, purpose: string) => {
        const { user } = get()
        
        if (!user || user.tokens < amount) return false

        const transaction: TokenTransaction = {
          id: crypto.randomUUID(),
          email: user.email,
          action: 'spend',
          amount,
          source: 'manual',
          metadata: { purpose },
          timestamp: new Date(),
        }

        set(state => ({
          user: {
            ...state.user!,
            tokens: state.user!.tokens - amount,
          },
          transactions: [...state.transactions, transaction],
        }))

        return true
      },

      getMonthlyEarned: () => {
        const { transactions, user } = get()
        if (!user) return 0

        const monthStart = new Date()
        monthStart.setDate(1)
        monthStart.setHours(0, 0, 0, 0)

        return transactions
          .filter(t => 
            t.action === 'earn' && 
            t.email === user.email &&
            new Date(t.timestamp) >= monthStart
          )
          .reduce((sum, t) => sum + t.amount, 0)
      },

      canEarn: (source: TokenTransaction['source']) => {
        const { user, transactions } = get()
        if (!user) return false

        const monthlyEarned = get().getMonthlyEarned()
        const monthlyCap = MONTHLY_CAPS[user.tier]
        
        if (monthlyEarned >= monthlyCap) return false

        // Check daily limits
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        
        const todayEarned = transactions
          .filter(t => 
            t.action === 'earn' && 
            t.source === source &&
            t.email === user.email &&
            new Date(t.timestamp) >= today
          )
          .reduce((sum, t) => sum + t.amount, 0)

        const dailyLimit = DAILY_LIMITS[source as keyof typeof DAILY_LIMITS]
        if (dailyLimit && todayEarned >= dailyLimit) return false

        // Check weekly limits for social
        if (source === 'social') {
          const weekStart = new Date()
          weekStart.setDate(weekStart.getDate() - weekStart.getDay())
          weekStart.setHours(0, 0, 0, 0)
          
          const weeklyEarned = transactions
            .filter(t => 
              t.action === 'earn' && 
              t.source === 'social' &&
              t.email === user.email &&
              new Date(t.timestamp) >= weekStart
            )
            .reduce((sum, t) => sum + t.amount, 0)
          
          if (weeklyEarned >= 15) return false
        }

        // Check testimonial once-ever limit
        if (source === 'testimonial') {
          const hasTestimonial = transactions.some(t => 
            t.source === 'testimonial' && t.email === user.email
          )
          if (hasTestimonial) return false
        }

        return true
      },

      syncWithCloud: async () => {
        // Placeholder for cloud sync
        // Will implement with Supabase/Firebase
        console.log('Cloud sync not yet implemented')
      },
    }),
    {
      name: 'anchorstack-tokens',
      version: 1,
    }
  )
)

// src/components/TokenBalance.tsx
import React from 'react'
import { Coins, TrendingUp, Calendar } from 'lucide-react'
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

  return (
    <div className="space-y-4">
      <Card className="bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Coins className="w-6 h-6 text-yellow-600" />
                <h3 className="text-lg font-semibold text-yellow-800">Faith Tokens</h3>
              </div>
              <div className="text-3xl font-bold text-yellow-900 mb-1">
                {user.tokens.toLocaleString()}
              </div>
              <div className="text-sm text-yellow-700">
                Available to spend
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-yellow-700 mb-1">This Month</div>
              <div className="text-xl font-semibold text-yellow-800">
                {monthlyEarned} / {MONTHLY_CAP}
              </div>
              <div className="w-24 bg-yellow-200 rounded-full h-2 mt-1">
                <div 
                  className="bg-yellow-500 h-2 rounded-full transition-all"
                  style={{ width: `${Math.min((monthlyEarned / MONTHLY_CAP) * 100, 100)}%` }}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {recentTransactions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5" />
              <span>Recent Activity</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${
                      transaction.action === 'earn' ? 'bg-green-500' : 'bg-red-500'
                    }`} />
                    <span className="capitalize">{transaction.source}</span>
                    {transaction.productId && (
                      <span className="text-anchor-500">• {transaction.productId}</span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`font-medium ${
                      transaction.action === 'earn' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.action === 'earn' ? '+' : '-'}{transaction.amount}
                    </span>
                    <Calendar className="w-3 h-3 text-anchor-400" />
                    <span className="text-anchor-500">
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

// src/components/EarnTokensPanel.tsx
import React from 'react'
import { Clock, GamepadIcon, Share2, MessageSquare, Gift } from 'lucide-react'
import { useTokenStore } from '@/store/useTokenStore'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/Button'

export const EarnTokensPanel: React.FC = () => {
  const { user, addTokens, canEarn } = useTokenStore()

  if (!user) return null

  const earnMethods = [
    {
      id: 'login',
      title: 'Daily Check-in',
      description: 'Log in daily to earn tokens',
      icon: Clock,
      tokens: 2,
      action: () => addTokens(2, 'login'),
      canEarn: canEarn('login'),
      frequency: 'Daily'
    },
    {
      id: 'quest',
      title: 'Complete Quest',
      description: 'Finish BootyQuest challenges',
      icon: GamepadIcon,
      tokens: 10,
      action: () => addTokens(10, 'quest'),
      canEarn: canEarn('quest'),
      frequency: 'Per completion'
    },
    {
      id: 'social',
      title: 'Share Content',
      description: 'Share AnchorStack on social media',
      icon: Share2,
      tokens: 15,
      action: () => {
        window.open(`https://twitter.com/intent/tweet?text=Building my creator business with @AnchorStack 🎯 The faith-based productivity system that actually works! Check it out:&url=${window.location.origin}`, '_blank')
        addTokens(15, 'social')
      },
      canEarn: canEarn('social'),
      frequency: 'Weekly'
    },
    {
      id: 'testimonial',
      title: 'Leave Testimonial',
      description: 'Share your AnchorStack experience',
      icon: MessageSquare,
      tokens: 25,
      action: () => {
        // This would open a testimonial form
        alert('Testimonial form would open here')
        addTokens(25, 'testimonial')
      },
      canEarn: canEarn('testimonial'),
      frequency: 'One-time'
    }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Gift className="w-5 h-5" />
          <span>Earn Faith Tokens</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {earnMethods.map((method) => {
            const IconComponent = method.icon
            return (
              <div key={method.id} className={`
                flex items-center justify-between p-4 rounded-lg border transition-colors
                ${method.canEarn ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'}
              `}>
                <div className="flex items-center space-x-3">
                  <IconComponent className={`w-5 h-5 ${
                    method.canEarn ? 'text-green-600' : 'text-gray-400'
                  }`} />
                  <div>
                    <h4 className={`font-medium ${
                      method.canEarn ? 'text-green-800' : 'text-gray-600'
                    }`}>
                      {method.title}
                    </h4>
                    <p className={`text-sm ${
                      method.canEarn ? 'text-green-600' : 'text-gray-500'
                    }`}>
                      {method.description} • {method.frequency}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`font-bold ${
                    method.canEarn ? 'text-green-600' : 'text-gray-400'
                  }`}>
                    +{method.tokens}
                  </span>
                  <Button
                    onClick={method.action}
                    disabled={!method.canEarn}
                    size="sm"
                    variant={method.canEarn ? 'default' : 'outline'}
                  >
                    {method.canEarn ? 'Earn' : 'Claimed'}
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

// src/components/RedeemTokens.tsx
import React, { useState } from 'react'
import { ShoppingCart, Download, Trophy, Gift } from 'lucide-react'
import { useTokenStore } from '@/store/useTokenStore'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/Button'

export const RedeemTokens: React.FC = () => {
  const { user, spendTokens } = useTokenStore()
  const [redeeming, setRedeeming] = useState<string | null>(null)

  if (!user) return null

  const redemptions = [
    {
      id: 'discount5',
      title: '$5 Off Next Order',
      description: 'Get $5 discount on orders over $20',
      icon: ShoppingCart,
      cost: 100,
      action: async () => {
        // Generate a unique coupon code
        const couponCode = `FAITH${Date.now().toString().slice(-6)}`
        
        // This would typically call your backend to create a Gumroad discount
        alert(`Coupon Code: ${couponCode}\nUse this code at checkout for $5 off orders over $20!`)
        
        return spendTokens(100, 'discount_5_dollar')
      }
    },
    {
      id: 'freebie',
      title: 'Free Vault Item',
      description: 'Unlock a selected free resource',
      icon: Download,
      cost: 150,
      action: async () => {
        // This would show a modal with available freebies
        alert('Choose your free item from our curated selection!')
        return spendTokens(150, 'free_vault_item')
      }
    },
    {
      id: 'giveaway',
      title: 'Giveaway Entry',
      description: 'Enter monthly $25 bundle giveaway',
      icon: Trophy,
      cost: 50,
      action: async () => {
        alert('You\'re entered in this month\'s giveaway! Winner announced on the 1st.')
        return spendTokens(50, 'giveaway_entry')
      }
    }
  ]

  const handleRedeem = async (redemption: typeof redemptions[0]) => {
    if (user.tokens < redemption.cost) return
    
    setRedeeming(redemption.id)
    
    try {
      const success = await redemption.action()
      if (success) {
        // Success handled by the action
      }
    } catch (error) {
      alert('Something went wrong. Please try again.')
    } finally {
      setRedeeming(null)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Gift className="w-5 h-5" />
          <span>Redeem Tokens</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {redemptions.map((redemption) => {
            const IconComponent = redemption.icon
            const canAfford = user.tokens >= redemption.cost
            const isRedeeming = redeeming === redemption.id
            
            return (
              <div key={redemption.id} className={`
                flex items-center justify-between p-4 rounded-lg border transition-colors
                ${canAfford ? 'border-blue-200 bg-blue-50' : 'border-gray-200 bg-gray-50'}
              `}>
                <div className="flex items-center space-x-3">
                  <IconComponent className={`w-5 h-5 ${
                    canAfford ? 'text-blue-600' : 'text-gray-400'
                  }`} />
                  <div>
                    <h4 className={`font-medium ${
                      canAfford ? 'text-blue-800' : 'text-gray-600'
                    }`}>
                      {redemption.title}
                    </h4>
                    <p className={`text-sm ${
                      canAfford ? 'text-blue-600' : 'text-gray-500'
                    }`}>
                      {redemption.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`font-bold ${
                    canAfford ? 'text-blue-600' : 'text-gray-400'
                  }`}>
                    {redemption.cost} tokens
                  </span>
                  <Button
                    onClick={() => handleRedeem(redemption)}
                    disabled={!canAfford || isRedeeming}
                    size="sm"
                    variant={canAfford ? 'default' : 'outline'}
                  >
                    {isRedeeming ? 'Redeeming...' : canAfford ? 'Redeem' : 'Not enough'}
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

// src/components/EmailLogin.tsx
import React, { useState } from 'react'
import { Mail, CheckCircle } from 'lucide-react'
import { useTokenStore } from '@/store/useTokenStore'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/Button'

export const EmailLogin: React.FC = () => {
  const { user, setUser } = useTokenStore()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setLoading(true)

    try {
      // For MVP, we'll just create/load the user locally
      // In production, this would send a magic link or verification code
      
      const newUser = {
        email,
        joinDate: new Date(),
        tier: 'free' as const,
        verified: true, // For MVP, auto-verify
        tokens: 0,
        purchaseHistory: [],
        lastLogin: new Date(),
      }

      setUser(newUser)
      
    } catch (error) {
      alert('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    setUser(null)
    setEmail('')
  }

  if (user) {
    return (
      <Card className="bg-green-50 border-green-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-green-800 font-medium">{user.email}</span>
            </div>
            <Button onClick={handleLogout} variant="outline" size="sm">
              Logout
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Mail className="w-5 h-5" />
          <span>Access Faith Tokens</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleEmailSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-anchor-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="w-full px-3 py-2 border border-anchor-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <Button
            type="submit"
            disabled={loading || !email}
            className="w-full"
          >
            {loading ? 'Loading...' : 'Start Earning Tokens'}
          </Button>
          <p className="text-xs text-anchor-500 text-center">
            Join the faith-based creator community and start earning tokens for engagement!
          </p>
        </form>
      </CardContent>
    </Card>
  )
}

// src/utils/gumroadWebhook.ts
export interface GumroadWebhookData {
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

export const handleGumroadWebhook = async (webhookData: GumroadWebhookData) => {
  const { email, price, product_id, product_name } = webhookData
  
  // Calculate tokens (5 per $1)
  const tokens = Math.floor(price * 5)
  
  // Update user tier based on purchase
  let tier: 'free' | 'mid' | 'top' | 'lifetime' = 'free'
  
  if (price >= 200) tier = 'lifetime'
  else if (price >= 75) tier = 'top'
  else if (price >= 25) tier = 'mid'
  
  // This would typically save to your database
  // For now, it's a blueprint for the webhook handler
  
  console.log(`User ${email} purchased ${product_name} for $${price}`)
  console.log(`Awarding ${tokens} tokens and upgrading to ${tier} tier`)
  
  return {
    success: true,
    tokensAwarded: tokens,
    newTier: tier,
  }
}

// src/pages/Tokens.tsx - New page for token management
import React from 'react'
import { EmailLogin } from '@/components/EmailLogin'
import { TokenBalance } from '@/components/TokenBalance'
import { EarnTokensPanel } from '@/components/EarnTokensPanel'
import { RedeemTokens } from '@/components/RedeemTokens'
import { useTokenStore } from '@/store/useTokenStore'

export const Tokens: React.FC = () => {
  const { user } = useTokenStore()

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-anchor-900 mb-2">
          Faith Tokens
        </h1>
        <p className="text-anchor-600 max-w-2xl mx-auto">
          Earn tokens through engagement and redeem them for exclusive rewards, discounts, and freebies.
        </p>
      </div>

      <EmailLogin />

      {user && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <TokenBalance />
            <EarnTokensPanel />
          </div>
          <div>
            <RedeemTokens />
          </div>
        </div>
      )}

      {user && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 text-center">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            How Faith Tokens Work
          </h3>
          <p className="text-blue-700 mb-4 max-w-2xl mx-auto">
            Faith Tokens are our way of rewarding your engagement and loyalty. Earn them through 
            daily activities, purchases, and community participation. Redeem them for real value!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-white rounded-lg p-4">
              <div className="font-semibold text-green-800 mb-1">Earn</div>
              <div className="text-green-600">Login daily, complete quests, make purchases, share content</div>
            </div>
            <div className="bg-white rounded-lg p-4">
              <div className="font-semibold text-blue-800 mb-1">Redeem</div>
              <div className="text-blue-600">Discounts, free items, giveaway entries, exclusive access</div>
            </div>
            <div className="bg-white rounded-lg p-4">
              <div className="font-semibold text-purple-800 mb-1">Grow</div>
              <div className="text-purple-600">Higher tiers unlock better earning rates and rewards</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
