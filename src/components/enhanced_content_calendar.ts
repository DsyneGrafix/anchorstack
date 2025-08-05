// src/pages/ContentCalendar.tsx - Enhanced Coming Soon Calendar
import React, { useState } from 'react'
import { Calendar, Clock, Crown, Users, Bell, Zap, CheckCircle, Star } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

const tierBadges = {
  bronze: { color: 'bg-amber-100 text-amber-800', icon: '🟫', label: 'Bronze+' },
  silver: { color: 'bg-gray-100 text-gray-800', icon: '⚪', label: 'Silver+' },
  gold: { color: 'bg-yellow-100 text-yellow-800', icon: '🟡', label: 'Gold+' },
  platinum: { color: 'bg-purple-100 text-purple-800', icon: '🟣', label: 'Platinum' },
  premium: { color: 'bg-red-100 text-red-800', icon: '💎', label: 'Premium Drop' }
}

const upcomingContent = [
  {
    id: 1,
    title: "Sacred Morning Routines Masterclass",
    description: "Complete video series + workbook on building intentional morning practices that anchor your day in purpose.",
    category: "Devotionals",
    tier: "premium",
    releaseDate: "Aug 5",
    estimatedValue: "$197",
    subscribers: 847,
    isHot: true,
    contentType: "Video Course + PDF"
  },
  {
    id: 2,
    title: "Digital Sabbath Planning Kit",
    description: "Templates and frameworks to reclaim rest in a hyperconnected world. Includes phone wallpapers and automation scripts.",
    category: "Wellness",
    tier: "silver",
    releaseDate: "Aug 6",
    estimatedValue: "$47",
    subscribers: 1203,
    isHot: false,
    contentType: "Template Pack"
  },
  {
    id: 3,
    title: "The Book of Ruth Study Guide",
    description: "4-week deep-dive with historical context, reflection prompts, and modern application. Perfect for small groups.",
    category: "Bible Study",
    tier: "gold",
    releaseDate: "Aug 8",
    estimatedValue: "$67",
    subscribers: 521,
    isHot: false,
    contentType: "Study Guide"
  },
  {
    id: 4,
    title: "Leadership in Crisis Playbook",
    description: "Biblical leadership principles for navigating uncertainty. Case studies from Scripture + modern applications.",
    category: "Leadership",
    tier: "platinum",
    releaseDate: "Aug 10",
    estimatedValue: "$127",
    subscribers: 234,
    isHot: true,
    contentType: "Strategic Guide"
  },
  {
    id: 5,
    title: "Vault Visuals: Faith & Focus Wallpapers",
    description: "20 high-resolution wallpapers for desktop and mobile. Scripture-based designs in modern, minimalist style.",
    category: "Design",
    tier: "bronze",
    releaseDate: "Aug 12",
    estimatedValue: "$27",
    subscribers: 1847,
    isHot: false,
    contentType: "Digital Assets"
  },
  {
    id: 6,
    title: "Decision Detox Workshop",
    description: "Complete framework for clearing decision fatigue and improving clarity. Includes decision trees and worksheets.",
    category: "Productivity",
    tier: "silver",
    releaseDate: "Aug 14",
    estimatedValue: "$77",
    subscribers: 692,
    isHot: false,
    contentType: "Workshop + Tools"
  },
  {
    id: 7,
    title: "Church Growth Through Clarity",
    description: "Strategic planning toolkit for ministry leaders. Vision casting, team alignment, and growth metrics that matter.",
    category: "Ministry",
    tier: "premium",
    releaseDate: "Aug 16",
    estimatedValue: "$297",
    subscribers: 156,
    isHot: true,
    contentType: "Strategy Course"
  },
  {
    id: 8,
    title: "Creative Worship Planning Suite",
    description: "Templates, themes, and creative elements for engaging worship experiences. Includes Canva templates.",
    category: "Creativity",
    tier: "gold",
    releaseDate: "Aug 18",
    estimatedValue: "$87",
    subscribers: 378,
    isHot: false,
    contentType: "Creative Pack"
  }
]

const weeklyStats = {
  totalDrops: 8,
  averageValue: "$116",
  totalSubscribers: 5878,
  hotReleases: 3
}

export const ContentCalendar: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [notifyEnabled, setNotifyEnabled] = useState(false)

  const categories = ['all', ...Array.from(new Set(upcomingContent.map(item => item.category)))]
  
  const filteredContent = selectedCategory === 'all' 
    ? upcomingContent 
    : upcomingContent.filter(item => item.category === selectedCategory)

  const handleNotifyToggle = () => {
    setNotifyEnabled(!notifyEnabled)
    // Here you would integrate with notification system
  }

  const getTierBadge = (tier: string) => {
    return tierBadges[tier as keyof typeof tierBadges] || tierBadges.silver
  }

  const getDaysUntilRelease = (releaseDate: string) => {
    // Simple calculation - in real app, use proper date library
    const today = new Date()
    const release = new Date(`2024-${releaseDate}`)
    const diffTime = release.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return Math.max(0, diffDays)
  }

  return (
    <div className="min-h-screen bg-anchor-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">
              📅 Content Release Calendar
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              See what's dropping next in the AnchorStack Vault. Fresh content added weekly — 
              never run out of tools to build with intention.
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold">{weeklyStats.totalDrops}</div>
                <div className="text-sm text-blue-200">Drops This Month</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{weeklyStats.averageValue}</div>
                <div className="text-sm text-blue-200">Avg. Value</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{weeklyStats.totalSubscribers.toLocaleString()}</div>
                <div className="text-sm text-blue-200">Waiting Subscribers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{weeklyStats.hotReleases}</div>
                <div className="text-sm text-blue-200">🔥 Hot Releases</div>
              </div>
            </div>

            <Button 
              onClick={handleNotifyToggle}
              className={`${notifyEnabled ? 'bg-green-600 hover:bg-green-700' : 'bg-white text-blue-600 hover:bg-gray-100'}`}
            >
              <Bell className="w-5 h-5 mr-2" />
              {notifyEnabled ? 'Notifications On ✓' : 'Get Release Notifications'}
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-anchor-600 hover:bg-primary-50'
              }`}
            >
              {category === 'all' ? 'All Content' : category}
            </button>
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredContent.map((item) => {
            const tierBadge = getTierBadge(item.tier)
            const daysUntil = getDaysUntilRelease(item.releaseDate)
            
            return (
              <Card key={item.id} className={`relative overflow-hidden ${item.isHot ? 'ring-2 ring-orange-400' : ''}`}>
                {/* Hot Badge */}
                {item.isHot && (
                  <div className="absolute top-3 right-3 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
                    <Zap className="w-3 h-3" />
                    <span>HOT</span>
                  </div>
                )}

                <CardContent className="p-6">
                  {/* Header */}
                  <div className="mb-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-lg text-anchor-900 leading-tight">
                        {item.title}
                      </h3>
                    </div>
                    
                    <div className="flex items-center space-x-2 mb-3">
                      <span className={`text-xs font-medium px-2 py-1 rounded ${tierBadge.color}`}>
                        {tierBadge.icon} {tierBadge.label}
                      </span>
                      <span className="text-xs text-anchor-500 bg-anchor-100 px-2 py-1 rounded">
                        {item.contentType}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-anchor-600 mb-4 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Release Info */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-1 text-anchor-700">
                        <Calendar className="w-4 h-4" />
                        <span>Drops {item.releaseDate}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-green-600 font-medium">
                        <Star className="w-4 h-4" />
                        <span>{item.estimatedValue} value</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-1 text-anchor-500">
                        <Users className="w-4 h-4" />
                        <span>{item.subscribers.toLocaleString()} waiting</span>
                      </div>
                      {daysUntil <= 3 && (
                        <div className="flex items-center space-x-1 text-orange-600 font-medium">
                          <Clock className="w-4 h-4" />
                          <span>{daysUntil === 0 ? 'Today!' : `${daysUntil} days`}</span>
                        </div>
                      )}
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-anchor-200 rounded-full h-2">
                      <div 
                        className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.max(10, 100 - (daysUntil * 10))}%` }}
                      />
                    </div>

                    {/* Action Button */}
                    <Button 
                      className="w-full"
                      variant={daysUntil <= 1 ? 'default' : 'outline'}
                      size="sm"
                    >
                      {daysUntil === 0 ? (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Available Now
                        </>
                      ) : (
                        <>
                          <Bell className="w-4 h-4 mr-2" />
                          Notify Me
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <Card className="mt-16 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
          <CardContent className="text-center py-12">
            <h3 className="text-2xl font-bold text-purple-900 mb-4">
              Never Miss a Drop
            </h3>
            <p className="text-purple-700 mb-6 max-w-2xl mx-auto">
              Join thousands of creators, pastors, and entrepreneurs who get first access 
              to new AnchorStack content. New tools drop weekly — stay ahead of the curve.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Crown className="w-5 h-5 mr-2" />
                Upgrade to Platinum
              </Button>
              <Button variant="outline" className="border-purple-300 text-purple-700">
                <Bell className="w-5 h-5 mr-2" />
                Enable Notifications
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}