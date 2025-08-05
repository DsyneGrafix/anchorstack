// src/pages/VaultLanding.tsx - Subscription-First Vault Page
import React from 'react'
import { Crown, Download, TrendingUp, Users, Clock, CheckCircle, Zap, Target } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

const metrics = [
  { icon: TrendingUp, label: 'New Products Weekly', value: '10-20', color: 'text-green-600' },
  { icon: Download, label: 'Total Products', value: '500+', color: 'text-blue-600' },
  { icon: Users, label: 'Active Subscribers', value: '1,247', color: 'text-purple-600' },
  { icon: Clock, label: 'Content Updated', value: 'Daily', color: 'text-orange-600' }
]

const tiers = [
  {
    name: 'Bronze',
    icon: '🟫',
    price: 29,
    billing: 'month',
    popular: false,
    description: 'Rotating vault access + weekly tools',
    features: [
      'Access to rotating vault selection',
      '2-3 new tools weekly',
      'Basic templates & guides',
      'Community access',
      'Mobile app access'
    ],
    buttonText: 'Start Bronze',
    buttonClass: 'bg-amber-600 hover:bg-amber-700'
  },
  {
    name: 'Silver',
    icon: '⚪',
    price: 49,
    billing: 'month',
    popular: true,
    description: 'Full vault library access + new drops weekly',
    features: [
      'Complete vault library access',
      '10-20 new products weekly',
      'Premium templates & frameworks',
      'Priority community support',
      'Early access to new releases',
      'Exclusive subscriber content'
    ],
    buttonText: 'Join Silver',
    buttonClass: 'bg-blue-500 hover:bg-blue-600'
  },
  {
    name: 'Gold',
    icon: '🟡',
    price: 199,
    billing: 'year',
    popular: false,
    description: 'Yearly access + bonus kits + 1 premium drop/quarter',
    features: [
      'Everything in Silver',
      'Annual subscription discount',
      'Quarterly bonus content kits',
      '1 premium drop included per quarter',
      'Exclusive Gold member webinars',
      'Direct access to creator'
    ],
    buttonText: 'Go Gold',
    buttonClass: 'bg-yellow-500 hover:bg-yellow-600'
  },
  {
    name: 'Platinum',
    icon: '🟣',
    price: 300,
    billing: 'year',
    popular: false,
    description: 'Everything + all future premium drops unlocked',
    features: [
      'Everything in Gold',
      'ALL premium drops included ($2,000+ value)',
      'Beta access to new tools',
      'Monthly 1:1 strategy calls',
      'Custom template requests',
      'Lifetime updates guarantee'
    ],
    buttonText: 'Go Platinum',
    buttonClass: 'bg-purple-600 hover:bg-purple-700'
  },
  {
    name: 'Master Class',
    icon: '🧠',
    price: 450,
    billing: 'year',
    popular: false,
    description: 'Churches + Teams: Vault license for up to 10 seats',
    features: [
      'Everything in Platinum',
      'Up to 10 team member accounts',
      'Church/ministry license',
      'Team admin dashboard',
      'Bulk download capabilities',
      'Custom training sessions'
    ],
    buttonText: 'Request Access',
    buttonClass: 'bg-gray-700 hover:bg-gray-800'
  }
]

const recentDrops = [
  {
    title: 'Sacred Morning Rituals Kit',
    category: 'Devotionals',
    date: '2 days ago',
    downloads: '1,247'
  },
  {
    title: 'Leadership Prayer Templates',
    category: 'Leadership', 
    date: '4 days ago',
    downloads: '892'
  },
  {
    title: 'Biblical Decision Framework',
    category: 'Productivity',
    date: '6 days ago',
    downloads: '567'
  }
]

const testimonials = [
  {
    text: "The weekly drops are insane. I've replaced 3 different productivity systems with just AnchorStack content.",
    author: "Sarah M., Youth Pastor",
    tier: "Silver"
  },
  {
    text: "Our entire church staff uses the Master Class license. Game-changer for our ministry planning.",
    author: "Pastor John K.",
    tier: "Master Class"
  },
  {
    text: "I joined for the devotionals, stayed for everything else. The value is absolutely ridiculous.",
    author: "Mike R., Creative Director",
    tier: "Platinum"
  }
]

export const VaultLanding: React.FC = () => {
  return (
    <div className="min-h-screen bg-anchor-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">
            The AnchorStack Vault
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            A living library of faith-based tools, templates, and resources. 
            <strong> 10-20 new products added weekly.</strong> No fluff. No filler. 
            Just clarity-driven content that actually works.
          </p>
          
          {/* Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
            {metrics.map((metric, index) => (
              <div key={index} className="text-center">
                <metric.icon className="w-8 h-8 mx-auto mb-2 text-blue-200" />
                <div className="text-2xl font-bold">{metric.value}</div>
                <div className="text-sm text-blue-200">{metric.label}</div>
              </div>
            ))}
          </div>

          <Button className="bg-white text-primary-600 hover:bg-gray-100 text-lg px-8 py-3">
            <Zap className="w-5 h-5 mr-2" />
            Choose Your Access Level
          </Button>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-anchor-900 mb-4">
              Choose Your Vault Access
            </h2>
            <p className="text-lg text-anchor-600 max-w-2xl mx-auto">
              Unlock weekly drops, exclusive resources, and rotating premium content. 
              Choose your tier — grow with the vault.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {tiers.map((tier, index) => (
              <Card 
                key={index}
                className={`relative ${tier.popular ? 'border-4 border-blue-400 shadow-lg' : ''}`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                      MOST POPULAR
                    </span>
                  </div>
                )}
                
                <CardContent className="p-6 text-center">
                  <h3 className="text-2xl font-semibold mb-2">
                    {tier.icon} {tier.name}
                  </h3>
                  <p className="text-gray-500 text-sm mb-4 h-12">
                    {tier.description}
                  </p>
                  
                  <div className="mb-6">
                    <span className="text-3xl font-bold">${tier.price}</span>
                    <span className="text-base font-normal">/{tier.billing}</span>
                  </div>

                  <ul className="text-left space-y-2 mb-6 text-sm">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    className={`w-full ${tier.buttonClass}`}
                    onClick={() => {
                      if (tier.name === 'Master Class') {
                        window.location.href = '/contact'
                      } else {
                        console.log(`Joining ${tier.name} tier`)
                      }
                    }}
                  >
                    {tier.buttonText}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <p className="text-sm text-gray-400 text-center mt-10">
            Cancel anytime. Premium drops ($99–$297) sold separately unless specified. 
            Platinum and Master Class tiers include full unlocks.
          </p>
        </div>
      </div>

      {/* Recent Drops */}
      <div className="py-16 bg-anchor-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-anchor-900 mb-4">
              🔥 Latest Drops
            </h2>
            <p className="text-anchor-600">
              See what subscribers accessed this week
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentDrops.map((drop, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-anchor-900 mb-1">
                        {drop.title}
                      </h3>
                      <p className="text-sm text-anchor-600">{drop.category}</p>
                    </div>
                    <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded">
                      NEW
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-anchor-500">
                    <span>{drop.date}</span>
                    <span>{drop.downloads} downloads</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-anchor-900 mb-12">
            What Subscribers Say
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <p className="text-anchor-700 mb-4 italic">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-anchor-900">
                      {testimonial.author}
                    </p>
                    <span className="text-xs text-anchor-500 bg-anchor-100 px-2 py-1 rounded">
                      {testimonial.tier}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Join the Content Revolution?
          </h2>
          <p className="text-xl mb-8">
            10-20 new tools weekly. Unlimited access. Cancel anytime.
            Start building with intention today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-3">
              <Target className="w-5 h-5 mr-2" />
              Start with Silver ($49/mo)
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600 text-lg px-8 py-3">
              <Crown className="w-5 h-5 mr-2" />
              Go Platinum ($300/yr)
            </Button>
          </div>
          
          <p className="text-sm text-purple-200 mt-6">
            Join 1,247+ creators, pastors, and entrepreneurs building with purpose
          </p>
        </div>
      </div>
    </div>
  )
}