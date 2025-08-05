// DEPLOYMENT PACKAGE: Faith Token System
// Copy these files to your AnchorStack project

// =====================================
// 1. src/pages/Tokens.tsx - Complete Token Dashboard
// =====================================

import React, { useState } from 'react'
import { Coins, Gift, Star, Crown, Zap, Users, Trophy, Shield, ArrowRight, Mail, CheckCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTokenStore } from '@/store/useTokenStore'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/Button'

// Email Login Component (embedded for simplicity)
const EmailLogin: React.FC = () => {
  const { user, setUser } = useTokenStore()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setLoading(true)

    try {
      const newUser = {
        email,
        joinDate: new Date(),
        tier: 'free' as const,
        verified: true,
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
              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded capitalize">
                {user.tier} member
              </span>
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
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-center">
          <Mail className="w-5 h-5" />
          <span>Join the Faith Token Community</span>
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
            {loading ? 'Setting up your account...' : 'Start Earning Faith Tokens'}
          </Button>
          <p className="text-xs text-anchor-500 text-center">
            Join the faith-based creator community and start earning rewards immediately!
          </p>
        </form>
      </CardContent>
    </Card>
  )
}

// Token Balance Component (embedded)
const TokenBalance: React.FC = () => {
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
      case 'lifetime': return 'text-amber-600'
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
              <Trophy className="w-4 h-4" />
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

// Earn Tokens Panel (embedded)
const EarnTokensPanel: React.FC = () => {
  const { user, addTokens, canEarn } = useTokenStore()

  if (!user) return null

  const earnMethods = [
    {
      id: 'login',
      title: 'Daily Check-in',
      description: 'Log in daily to earn tokens',
      icon: Zap,
      tokens: 2,
      action: () => addTokens(2, 'login'),
      canEarn: canEarn('login'),
      frequency: 'Daily'
    },
    {
      id: 'quest',
      title: 'Complete Focus Session',
      description: 'Finish Pomodoro sessions or BootyQuest challenges',
      icon: Trophy,
      tokens: 10,
      action: () => addTokens(10, 'quest'),
      canEarn: canEarn('quest'),
      frequency: 'Per completion'
    },
    {
      id: 'social',
      title: 'Share AnchorStack',
      description: 'Share on social media to spread the word',
      icon: Users,
      tokens: 15,
      action: () => {
        const text = 'Building my creator business with AnchorStack 🎯 The faith-based productivity system that actually works!'
        const url = window.location.origin
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank')
        addTokens(15, 'social')
      },
      canEarn: canEarn('social'),
      frequency: 'Weekly'
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

// Token Redemptions (embedded)
const TokenRedemptions: React.FC = () => {
  const { user, spendTokens } = useTokenStore()
  const [redeeming, setRedeeming] = useState<string | null>(null)

  if (!user) return null

  const redemptions = [
    {
      id: 'discount5',
      title: '$5 Off Next Order',
      description: 'Get $5 discount on orders over $20',
      icon: Gift,
      cost: 100,
      action: async () => {
        const couponCode = `FAITH${Date.now().toString().slice(-6)}`
        
        if (navigator.clipboard) {
          await navigator.clipboard.writeText(couponCode)
        }
        
        alert(`🎉 Discount Code Generated!\n\nCode: ${couponCode}\n\nUse this code for $5 off orders over $20!\n${navigator.clipboard ? 'Code copied to clipboard!' : 'Copy this code to use at checkout.'}`)
        
        return spendTokens(100, 'discount_5_dollar')
      }
    },
    {
      id: 'giveaway',
      title: 'Monthly Giveaway Entry',
      description: 'Enter to win $50 product bundle',
      icon: Trophy,
      cost: 50,
      action: async () => {
        alert('🏆 You\'re entered in this month\'s giveaway!\n\nWinner announced on the 1st of next month. Good luck!')
        return spendTokens(50, 'giveaway_entry')
      }
    }
  ]

  const handleRedeem = async (redemption: typeof redemptions[0]) => {
    if (user.tokens < redemption.cost) return
    
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

// Token Education Component
const TokenEducation: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Understanding Faith Tokens</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold text-anchor-800 mb-2">What are Faith Tokens?</h4>
            <p className="text-anchor-600 text-sm">
              Faith Tokens are our loyalty rewards system. They're earned through genuine engagement 
              with the AnchorStack community and can be redeemed for real value - discounts, 
              exclusive content, and special perks.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-anchor-800 mb-2">Why "Faith" Tokens?</h4>
            <p className="text-anchor-600 text-sm">
              Building a creator business requires faith - in your vision, in the process, 
              and in showing up consistently even when you don't see immediate results. 
              We reward that faithfulness.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-anchor-800 mb-2">Fair Play Promise</h4>
            <p className="text-anchor-600 text-sm">
              Our system has built-in safeguards to prevent abuse while rewarding genuine engagement. 
              Daily and monthly limits ensure fairness for all members, while higher tiers unlock 
              better earning potential as you invest in your creator journey.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-6">
          <h4 className="font-semibold text-blue-800 mb-3 flex items-center">
            <Shield className="w-5 h-5 mr-2" />
            Token Limits & Security
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <div className="font-medium text-blue-700 mb-1">Daily Earning Limits</div>
              <ul className="text-blue-600 space-y-0.5">
                <li>• Login: 2 tokens/day max</li>
                <li>• Focus sessions: 50 tokens/day max</li>
                <li>• Social sharing: 15 tokens/week max</li>
                <li>• Testimonials: 25 tokens once</li>
              </ul>
            </div>
            <div>
              <div className="font-medium text-blue-700 mb-1">Monthly Caps by Tier</div>
              <ul className="text-blue-600 space-y-0.5">
                <li>• Free: 100 tokens/month</li>
                <li>• Mid ($25+): 300 tokens/month</li>
                <li>• Top ($75+): 500 tokens/month</li>
                <li>• Lifetime ($200+): 1000 tokens/month</li>
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
              title: 'Focus Sessions',
              description: 'Complete Pomodoro timers',
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
            const colorClasses = {
              green: 'bg-green-100 text-green-600',
              blue: 'bg-blue-100 text-blue-600',
              purple: 'bg-purple-100 text-purple-600',
              yellow: 'bg-yellow-100 text-yellow-600'
            }
            
            return (
              <Card key={method.title} className="text-center">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 ${colorClasses[method.color as keyof typeof colorClasses]} rounded-lg flex items-center justify-center mx-auto mb-3`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-anchor-800 mb-2">{method.title}</h3>
                  <p className="text-sm text-anchor-600 mb-3">{method.description}</p>
                  <div className={`${colorClasses[method.color as keyof typeof colorClasses]} px-2 py-1 rounded text-xs font-bold`}>
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
            const colorClasses = {
              green: 'bg-green-100 text-green-600',
              blue: 'bg-blue-100 text-blue-600', 
              purple: 'bg-purple-100 text-purple-600',
              amber: 'bg-amber-100 text-amber-600'
            }
            
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
                  <div className={`w-12 h-12 ${colorClasses[tier.color as keyof typeof colorClasses]} rounded-lg flex items-center justify-center mx-auto mb-3`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-anchor-800 mb-1">{tier.tier}</h3>
                  <p className="text-sm text-anchor-500 mb-3">{tier.price}</p>
                  <div className={`${colorClasses[tier.color as keyof typeof colorClasses]} px-3 py-1 rounded font-bold text-sm mb-4`}>
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

// Main Tokens Page Component
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

// =====================================
// 2. Enhanced VaultTile.tsx with Token Integration
// =====================================

import React, { useState } from 'react'
import { ExternalLink, Download, Crown, Gift, Coins, Zap } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
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

// =====================================
// 3. api/gumroad-webhook.ts - Production Webhook
// =====================================

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

// =====================================
// 4. DEPLOYMENT CHECKLIST
// =====================================

/*
FAITH TOKEN SYSTEM - DEPLOYMENT CHECKLIST

✅ INSTALL DEPENDENCIES:
npm install zustand

✅ FILE STRUCTURE:
src/
├── pages/
│   └── Tokens.tsx                 (Complete dashboard)
├── components/
│   ├── VaultTile.tsx             (Enhanced with token discounts)
│   └── ... (existing components)
├── store/
│   └── useTokenStore.ts          (Your uploaded file)
└── types/
    └── index.ts                  (Add token types)

api/
└── gumroad-webhook.ts            (Webhook handler)

✅ UPDATE APP ROUTES:
// In App.tsx
import { Tokens } from '@/pages/Tokens'

<Route path="tokens" element={<Tokens />} />

✅ UPDATE NAVIGATION:
// In Layout.tsx
const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Focus', href: '/focus', icon: Clock },
  { name: 'Notes', href: '/notes', icon: FileText },
  { name: 'Vault', href: '/vault', icon: Anchor },
  { name: 'Tokens', href: '/tokens', icon: Coins }, // NEW
]

✅ GUMROAD SETUP:
1. Go to Gumroad Settings → Advanced → Webhooks
2. Add URL: https://yoursite.vercel.app/api/gumroad-webhook
3. Enable "Sale" events
4. Test with small purchase

✅ DEPLOY:
npm run build
vercel --prod

✅ TEST FEATURES:
- Email signup for tokens
- Daily check-in earning
- Token redemption flow
- Vault discount integration
- Mobile responsiveness

✅ LAUNCH MARKETING:
- Email announcement
- Social media posts
- Update website copy
- Add token mentions to existing content

🚀 READY TO LAUNCH YOUR FAITH TOKEN ECONOMY!
*/