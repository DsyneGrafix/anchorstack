// src/pages/Vault.tsx - FINAL VERSION WITH REAL PRODUCTS + STRIPE
import React, { useState } from 'react'
import { VaultTile } from '@/components/VaultTile'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { StripeButton, VaultUpgradeBar, TokenCTASection } from '@/components/StripeButton'
import { OpinionPoll } from '@/components/OpinionPoll'
import { Search, Filter, TrendingUp } from 'lucide-react'
import type { VaultProduct } from '@/types'

// REAL SACRED STRATEGY PRODUCTS - Ready for Production
const vaultProducts: VaultProduct[] = [
  // FREE TIER - Lead Magnets & Samples
  {
    id: 'faith-token-tracker',
    title: 'Faith Token Tracker',
    description: 'Transform your to-do list into a prayer list with this 30-day Sacred Strategy tracking system. Includes all 5 tokens: Clarity, Courage, Consistency, Compassion, and Calling.',
    tier: 'free',
    url: '/downloads/faith-token-tracker.pdf',
    category: 'Sacred Strategy',
    featured: true,
    downloads: 1247
  },
  {
    id: 'sacred-strategy-starters',
    title: '5 Sacred Strategy Starters',
    description: 'Morning intention prayers, decision flowcharts, and reflection prompts for purposeful productivity. Perfect introduction to sacred work practices.',
    tier: 'free', 
    url: '/downloads/sacred-strategy-starters.pdf',
    category: 'Sacred Strategy',
    downloads: 892
  },
  {
    id: 'levitical-priesthood-study',
    title: 'Decoding the Levitical Priesthood',
    description: 'Deep dive into Old Testament priesthood and its relevance for modern believers. Includes hidden Faith Token for bonus content.',
    tier: 'free',
    url: '/vault/levitical-priesthood',
    category: 'Biblical Studies',
    downloads: 634
  },
  
  // PREMIUM TIER - Core Content
  {
    id: 'formed-not-just-forgiven',
    title: 'Formed, Not Just Forgiven',
    description: 'Complete discipleship framework for character transformation beyond salvation. Move from forgiveness to formation with practical spiritual disciplines.',
    tier: 'premium',
    url: 'https://gumroad.com/l/formed-not-forgiven',
    category: 'Discipleship',
    featured: true,
    price: '$29'
  },
  {
    id: 'go-make-disciples-course',
    title: 'Go and Make Disciples',
    description: 'Practical course on fulfilling the Great Commission in everyday relationships. Learn to make disciples naturally through authentic relationships.',
    tier: 'premium',
    url: 'https://gumroad.com/l/go-make-disciples',
    category: 'Discipleship',
    price: '$39'
  },
  {
    id: 'sacred-strategy-planner',
    title: 'Sacred Strategy Planner',
    description: '30-day planning system integrating prayer, purpose, and productivity. Includes Sanctuary Sessions and Stewardship Reviews.',
    tier: 'premium',
    url: 'https://gumroad.com/l/sacred-strategy-planner',
    category: 'Sacred Strategy',
    price: '$25'
  },
  {
    id: 'complete-forgiveness-series',
    title: 'Complete Forgiveness',
    description: 'Comprehensive study on the finished work of Christ and what it means to be completely forgiven. Perfect for new believers or spiritual refreshing.',
    tier: 'premium',
    url: 'https://gumroad.com/l/complete-forgiveness',
    category: 'Theology',
    price: '$35'
  },
  {
    id: 'power-of-prayer-course',
    title: 'The Power of Prayer',
    description: 'Biblical foundation for effective prayer life. Learn to pray with confidence, persistence, and alignment with God\'s will.',
    tier: 'premium',
    url: 'https://gumroad.com/l/power-of-prayer',
    category: 'Spiritual Disciplines',
    price: '$29'
  },
  
  // EXCLUSIVE TIER - Deep Content & Physical Products
  {
    id: 'decoding-apocalypse',
    title: 'Decoding the Apocalypse',
    description: 'Comprehensive study of Revelation with historical context and practical application. Understand end times prophecy with clarity and hope.',
    tier: 'exclusive',
    url: 'https://gumroad.com/l/decoding-apocalypse',
    category: 'Biblical Studies',
    featured: true,
    price: '$79'
  },
  {
    id: 'fully-forgiven-series',
    title: 'Fully Forgiven Series',
    description: 'Advanced theology series on grace, justification, and the finished work of Christ. Deep theological exploration for mature believers.',
    tier: 'exclusive',
    url: 'https://gumroad.com/l/fully-forgiven',
    category: 'Theology',
    price: '$89'
  },
  {
    id: 'symbolism-revelation',
    title: 'Symbolism of Revelation',
    description: 'Unlock the symbolic language of Revelation. Understand the imagery, metaphors, and prophetic symbolism used throughout the book.',
    tier: 'exclusive',
    url: 'https://gumroad.com/l/symbolism-revelation',
    category: 'Biblical Studies',
    price: '$65'
  },
  {
    id: 'being-christian-deep-dive',
    title: 'Deep Dive: Being Christian',
    description: 'Comprehensive exploration of what it truly means to be a Christian in the modern world. Theology meets practical living.',
    tier: 'exclusive',
    url: 'https://gumroad.com/l/being-christian',
    category: 'Theology',
    price: '$55'
  }
]

export const Vault: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTier, setSelectedTier] = useState<string>('all')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const filteredProducts = vaultProducts.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTier = selectedTier === 'all' || product.tier === selectedTier
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    
    return matchesSearch && matchesTier && matchesCategory
  })

  const groupedProducts = filteredProducts.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = []
    }
    acc[product.category].push(product)
    return acc
  }, {} as Record<string, VaultProduct[]>)

  const featuredProducts = vaultProducts.filter(p => p.featured)
  const tierCounts = {
    free: vaultProducts.filter(p => p.tier === 'free').length,
    premium: vaultProducts.filter(p => p.tier === 'premium').length,
    exclusive: vaultProducts.filter(p => p.tier === 'exclusive').length,
  }

  const totalMembers = 247
  const totalDownloads = vaultProducts.reduce((sum, p) => sum + (p.downloads || 0), 0)
  const categories = [...new Set(vaultProducts.map(p => p.category))]

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8">
        <h1 className="text-3xl font-bold text-anchor-900 mb-2">
          ⚓ Sacred Strategy Vault
        </h1>
        <p className="text-anchor-600 max-w-2xl mx-auto mb-4">
          Your curated collection of biblical studies, discipleship resources, and sacred productivity tools.
        </p>
        <div className="flex items-center justify-center space-x-6 text-sm text-anchor-500">
          <span className="flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            {totalMembers} Members
          </span>
          <span className="flex items-center">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
            {totalDownloads.toLocaleString()} Downloads
          </span>
          <span className="flex items-center">
            <TrendingUp className="w-4 h-4 mr-1 text-green-500" />
            Growing Daily
          </span>
        </div>
      </div>

      {/* Upgrade Bar */}
      <VaultUpgradeBar />

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-anchor-900 flex items-center">
            🌟 Featured This Month
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <div 
                key={product.id} 
                className="transform transition-transform hover:scale-105"
              >
                <VaultTile product={product} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Search and Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search vault..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex gap-3">
            <select
              value={selectedTier}
              onChange={(e) => setSelectedTier(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Tiers</option>
              <option value="free">Free</option>
              <option value="premium">Premium</option>
              <option value="exclusive">Exclusive</option>
            </select>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Tier Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-green-200 bg-green-50">
          <CardContent className="text-center py-6">
            <div className="text-2xl font-bold text-green-600 mb-2">
              {tierCounts.free}
            </div>
            <div className="text-sm text-green-700 font-medium">Free Resources</div>
            <div className="text-xs text-green-600 mt-1">Start your journey</div>
          </CardContent>
        </Card>
        
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="text-center py-6">
            <div className="text-2xl font-bold text-blue-600 mb-2">
              {tierCounts.premium}
            </div>
            <div className="text-sm text-blue-700 font-medium">Premium Tools</div>
            <div className="text-xs text-blue-600 mt-1">Complete systems</div>
          </CardContent>
        </Card>
        
        <Card className="border-purple-200 bg-purple-50">
          <CardContent className="text-center py-6">
            <div className="text-2xl font-bold text-purple-600 mb-2">
              {tierCounts.exclusive}
            </div>
            <div className="text-sm text-purple-700 font-medium">Exclusive Access</div>
            <div className="text-xs text-purple-600 mt-1">Advanced studies</div>
          </CardContent>
        </Card>
      </div>

      {/* Opinion Poll Widget */}
      <OpinionPoll />

      {/* Products by Category */}
      {Object.entries(groupedProducts).map(([category, products]) => (
        <div key={category} className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-anchor-800 border-b border-anchor-200 pb-2">
              {category}
            </h2>
            <span className="text-sm text-anchor-500 bg-anchor-100 px-2 py-1 rounded">
              {products.length} items
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div 
                key={product.id} 
                onClick={() => {
                  // Track click
                  console.log(`Product clicked: ${product.title} (${product.tier})`)
                  window.open(product.url, '_blank')
                }}
                className="cursor-pointer transform transition-transform hover:scale-105"
              >
                <VaultTile product={product} />
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Token CTA Section */}
      <TokenCTASection />

      {/* Final CTA */}
      <Card className="bg-gradient-to-r from-primary-50 to-blue-50 border-primary-200">
        <CardContent className="text-center py-8">
          <h3 className="text-lg font-semibold text-primary-900 mb-2">
            🪙 Ready to Transform Your Productivity into Prayer?
          </h3>
          <p className="text-primary-700 mb-6">
            Start with our Faith Token Tracker, then upgrade to physical tokens and complete courses.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
            <Button 
              variant="outline"
              onClick={() => window.open('/downloads/faith-token-tracker.pdf', '_blank')}
              className="min-w-[200px]"
            >
              Download Free Tracker
            </Button>
            <StripeButton 
              productType="tokens" 
              price="$35"
              originalPrice="$45"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}