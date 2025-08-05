// src/pages/Dashboard.tsx - Enhanced Subscriber Dashboard
import React from 'react'
import { Calendar, Download, Crown, Star, TrendingUp, Clock, Gift } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

// Mock user data - replace with actual auth/subscription data
const mockUser = {
  name: "Ricky",
  tier: "silver", // bronze, silver, gold, platinum, masterclass
  joinDate: new Date('2024-01-15'),
  downloadsThisMonth: 23,
  favoriteCategory: "Devotionals"
}

const tierBadges = {
  bronze: { color: 'bg-amber-100 text-amber-800', icon: '🟫', label: 'Bronze' },
  silver: { color: 'bg-gray-100 text-gray-800', icon: '⚪', label: 'Silver' },
  gold: { color: 'bg-yellow-100 text-yellow-800', icon: '🟡', label: 'Gold' },
  platinum: { color: 'bg-purple-100 text-purple-800', icon: '🟣', label: 'Platinum' },
  masterclass: { color: 'bg-blue-100 text-blue-800', icon: '🧠', label: 'Master Class' }
}

const thisWeeksDrops = [
  {
    id: 1,
    title: "Sacred Morning Rituals Kit",
    category: "Devotionals",
    addedDate: "2024-08-01",
    downloads: 1247,
    isNew: true,
    tier: "silver"
  },
  {
    id: 2,
    title: "Leadership Prayer Templates",
    category: "Leadership",
    addedDate: "2024-07-30",
    downloads: 892,
    isNew: true,
    tier: "silver"
  },
  {
    id: 3,
    title: "Financial Stewardship Planner",
    category: "Productivity",
    addedDate: "2024-07-28",
    downloads: 567,
    isNew: false,
    tier: "bronze"
  },
  {
    id: 4,
    title: "Advanced Sermon Prep System",
    category: "Ministry",
    addedDate: "2024-07-26",
    downloads: 234,
    isNew: false,
    tier: "platinum",
    isPremium: true
  }
]

const comingNext = [
  { title: "Digital Sabbath Planning Kit", category: "Wellness", releaseDate: "Aug 5" },
  { title: "Youth Ministry Engagement Tools", category: "Ministry", releaseDate: "Aug 7" },
  { title: "Biblical Decision-Making Framework", category: "Leadership", releaseDate: "Aug 9" },
  { title: "Creative Worship Planning Suite", category: "Creativity", releaseDate: "Aug 12" }
]

export const SubscriberDashboard: React.FC = () => {
  const userTier = tierBadges[mockUser.tier as keyof typeof tierBadges]
  const canAccess = (itemTier: string) => {
    const tierHierarchy = { bronze: 1, silver: 2, gold: 2, platinum: 3, masterclass: 3 }
    const userLevel = tierHierarchy[mockUser.tier as keyof typeof tierHierarchy]
    const itemLevel = tierHierarchy[itemTier as keyof typeof tierHierarchy]
    return userLevel >= itemLevel
  }

  const handleDownload = (itemTitle: string) => {
    // Simulate download tracking
    console.log(`Downloading: ${itemTitle}`)
  }

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-primary-900 mb-2">
              Welcome back, {mockUser.name}! 🎯
            </h1>
            <p className="text-primary-700">
              Your content machine is ready. Here's what's new this week.
            </p>
          </div>
          <div className="text-right">
            <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-bold ${userTier.color}`}>
              <span>{userTier.icon}</span>
              <span>{userTier.label} Member</span>
            </div>
            <p className="text-sm text-primary-600 mt-1">
              Member since {mockUser.joinDate.toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <Download className="w-8 h-8 text-primary-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-primary-600">{mockUser.downloadsThisMonth}</div>
            <div className="text-sm text-anchor-600">Downloads This Month</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600">{thisWeeksDrops.length}</div>
            <div className="text-sm text-anchor-600">New This Week</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <Star className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
            <div className="text-lg font-bold text-yellow-600">{mockUser.favoriteCategory}</div>
            <div className="text-sm text-anchor-600">Top Category</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <Calendar className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-600">{comingNext.length}</div>
            <div className="text-sm text-anchor-600">Coming This Week</div>
          </CardContent>
        </Card>
      </div>

      {/* This Week's Drops */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-anchor-900">🔥 This Week's Drops</h2>
          <Button variant="outline" size="sm">
            View All Vault →
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {thisWeeksDrops.map((item) => (
            <Card key={item.id} className={`${item.isNew ? 'ring-2 ring-primary-200' : ''}`}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-semibold text-anchor-900">{item.title}</h3>
                      {item.isNew && (
                        <span className="bg-red-100 text-red-800 text-xs font-bold px-2 py-1 rounded">
                          NEW
                        </span>
                      )}
                      {item.isPremium && (
                        <Crown className="w-4 h-4 text-yellow-500" />
                      )}
                    </div>
                    <p className="text-sm text-anchor-600">{item.category}</p>
                    <p className="text-xs text-anchor-500 mt-1">
                      Added {new Date(item.addedDate).toLocaleDateString()} • {item.downloads} downloads
                    </p>
                  </div>
                </div>
                
                {canAccess(item.tier) ? (
                  <Button 
                    onClick={() => handleDownload(item.title)}
                    className="w-full"
                    size="sm"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Now
                  </Button>
                ) : (
                  <div className="text-center">
                    <p className="text-sm text-anchor-500 mb-2">
                      {item.isPremium ? 'Premium Drop' : 'Requires higher tier'}
                    </p>
                    <Button variant="outline" size="sm">
                      Upgrade to Access
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Coming Next */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="w-5 h-5" />
            <span>Coming This Week</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {comingNext.map((item, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-anchor-50 rounded-lg">
                <Calendar className="w-5 h-5 text-primary-600" />
                <div className="flex-1">
                  <p className="font-medium text-anchor-900">{item.title}</p>
                  <p className="text-sm text-anchor-600">{item.category} • {item.releaseDate}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tier Benefits */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-purple-900 mb-2">
                {userTier.icon} {userTier.label} Member Benefits
              </h3>
              <p className="text-purple-700">
                {mockUser.tier === 'bronze' && "Rotating vault access + weekly tools"}
                {mockUser.tier === 'silver' && "Full vault library access + new drops weekly"}
                {mockUser.tier === 'gold' && "Yearly access + bonus kits + quarterly premium drops"}
                {mockUser.tier === 'platinum' && "Everything + all future premium drops unlocked"}
                {mockUser.tier === 'masterclass' && "Team license for up to 10 seats + everything unlocked"}
              </p>
            </div>
            <div className="text-right">
              {mockUser.tier !== 'platinum' && mockUser.tier !== 'masterclass' && (
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Crown className="w-4 h-4 mr-2" />
                  Upgrade Tier
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}