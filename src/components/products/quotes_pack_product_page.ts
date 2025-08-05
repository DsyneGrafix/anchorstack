// src/pages/MotivationalQuotesPack.tsx
import React from 'react'
import { ArrowLeft, CheckCircle, Download, Zap, Users, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { DownloadCard } from '@/components/DownloadCard'

export const MotivationalQuotesPack: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-purple-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Button 
              variant="ghost" 
              onClick={() => window.history.back()}
              className="mr-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Vault
            </Button>
            <div className="text-sm text-gray-600">
              Free Download • 50 Motivational Quotes Pack
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl p-8">
              <div className="flex items-center space-x-2 mb-4">
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center">
                  <Zap className="w-3 h-3 mr-1" />
                  VIRAL READY
                </span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                  No Email Required
                </span>
              </div>
              
              <h1 className="text-4xl font-bold mb-4">
                🔥 50 Motivational Quotes Pack
              </h1>
              
              <p className="text-xl mb-6 opacity-90">
                Engagement-tested quotes that energize your content & your day
              </p>
              
              <div className="bg-white/10 rounded-lg p-4">
                <p className="text-lg italic">
                  "Stop scrolling for hours looking for the perfect quote. These 50 are proven engagement drivers."
                </p>
              </div>
            </div>

            {/* Problem/Solution */}
            <Card className="bg-yellow-50 border-yellow-200">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-yellow-800 mb-4">
                  ⚡ Stop the Quote Hunt
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <strong className="text-yellow-700">Before:</strong>
                    <ul className="text-yellow-600 text-sm mt-2 space-y-1">
                      <li>• 30 minutes hunting for one good quote</li>
                      <li>• Getting stuck in Pinterest comparison spirals</li>
                      <li>• Settling for generic content</li>
                      <li>• Inconsistent posting due to content gaps</li>
                    </ul>
                  </div>
                  <div>
                    <strong className="text-yellow-700">After:</strong>
                    <ul className="text-yellow-600 text-sm mt-2 space-y-1">
                      <li>• 50 ready-to-post quotes at your fingertips</li>
                      <li>• Engagement-tested content that performs</li>
                      <li>• 6 different formats for any platform</li>
                      <li>• Consistent inspiration for you and your audience</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* What You Get */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                What You Get (6 Complete Formats)
              </h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  {
                    icon: '📱',
                    title: 'Social Media Graphics',
                    description: 'Instagram-ready quote cards with professional design'
                  },
                  {
                    icon: '📝',
                    title: 'Plain Text Format',
                    description: 'Copy-paste ready quotes with hashtag suggestions'
                  },
                  {
                    icon: '🎨',
                    title: 'Canva Templates',
                    description: 'Customizable designs you can brand with your colors'
                  },
                  {
                    icon: '📲',
                    title: 'Phone Wallpapers',
                    description: 'Daily inspiration screens for personal motivation'
                  },
                  {
                    icon: '💻',
                    title: 'Desktop Backgrounds',
                    description: 'Workspace motivation for productive days'
                  },
                  {
                    icon: '🖨️',
                    title: 'Print-Ready Versions',
                    description: 'Physical desk cards and wall art for offline inspiration'
                  }
                ].map((item, index) => (
                  <Card key={index} className="border-purple-200 bg-purple-50">
                    <CardContent className="p-4 flex items-start space-x-4">
                      <div className="text-2xl">{item.icon}</div>
                      <div>
                        <h3 className="font-bold text-purple-900 mb-2">{item.title}</h3>
                        <p className="text-purple-700 text-sm">{item.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Quote Categories */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                5 High-Performance Categories (10 quotes each)
              </h2>
              
              <div className="space-y-4">
                {[
                  {
                    emoji: '💪',
                    title: 'Resilience & Grit',
                    description: 'Quotes about overcoming obstacles, bouncing back, and staying strong through challenges.',
                    example: '"Success is not final, failure is not fatal: it is the courage to continue that counts." — Winston Churchill',
                    color: 'red'
                  },
                  {
                    emoji: '🎯',
                    title: 'Focus & Productivity',
                    description: 'Quotes about getting things done, staying focused, and taking action on your goals.',
                    example: '"The way to get started is to quit talking and begin doing." — Walt Disney',
                    color: 'blue'
                  },
                  {
                    emoji: '✨',
                    title: 'Dreams & Vision',
                    description: 'Quotes about pursuing dreams, creating your future, and thinking bigger.',
                    example: '"The future belongs to those who believe in the beauty of their dreams." — Eleanor Roosevelt',
                    color: 'yellow'
                  },
                  {
                    emoji: '🔥',
                    title: 'Success & Achievement',
                    description: 'Quotes about reaching goals, excellence, and what it really means to succeed.',
                    example: '"The only way to do great work is to love what you do." — Steve Jobs',
                    color: 'orange'
                  },
                  {
                    emoji: '🌱',
                    title: 'Growth & Learning',
                    description: 'Quotes about personal development, learning, and continuous improvement.',
                    example: '"Growth begins at the end of your comfort zone." — Unknown',
                    color: 'green'
                  }
                ].map((category, index) => (
                  <Card key={index} className={`border-${category.color}-200 bg-${category.color}-50`}>
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="text-3xl">{category.emoji}</div>
                        <div className="flex-1">
                          <h3 className={`font-bold text-${category.color}-900 text-lg mb-2`}>
                            {category.title}
                          </h3>
                          <p className={`text-${category.color}-700 mb-3`}>
                            {category.description}
                          </p>
                          <div className={`bg-white p-3 rounded border-l-4 border-${category.color}-400`}>
                            <p className="text-sm italic text-gray-600">
                              Sample: {category.example}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Perfect For */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Perfect For:</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  'Content creators who need consistent inspiration',
                  'Entrepreneurs building personal brands',
                  'Social media managers running multiple accounts',
                  'Anyone who loves daily motivation',
                  'Team leaders inspiring their groups',
                  'Coaches and consultants sharing value'
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Why These Quotes */}
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Why These 50 Quotes?
                </h3>
                <div className="space-y-3 text-blue-700">
                  <p>
                    <strong>Engagement-Tested:</strong> I analyzed 500+ motivational quotes across my content over the past year. These 50 consistently drove the highest engagement, saves, and shares.
                  </p>
                  <p>
                    <strong>Timeless Appeal:</strong> No trendy phrases that'll feel dated next month. These quotes have inspired people for decades and will continue to resonate.
                  </p>
                  <p>
                    <strong>Versatile Usage:</strong> Whether you're posting on LinkedIn, Instagram, Twitter, or using them for personal motivation, these quotes work across all contexts.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Social Proof */}
            <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
              <CardContent className="p-6 text-center">
                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <div className="text-2xl font-bold text-green-600 mb-1">3,247</div>
                    <div className="text-sm text-green-700 flex items-center justify-center">
                      <Download className="w-4 h-4 mr-1" />
                      Downloads
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600 mb-1">4.8/5</div>
                    <div className="text-sm text-blue-700">Avg Rating</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600 mb-1">2.1M</div>
                    <div className="text-sm text-purple-700">Total Impressions</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Testimonials */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">What Creators Say</h2>
              <div className="space-y-4">
                <Card className="bg-green-50 border-green-200">
                  <CardContent className="p-6">
                    <p className="text-green-700 italic mb-3">
                      "This pack saved me hours every week. I used to spend forever looking for the right quote. Now I have 50 proven winners ready to go!"
                    </p>
                    <div className="text-green-600 font-medium">— Sarah K., Content Creator</div>
                  </CardContent>
                </Card>
                
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-6">
                    <p className="text-blue-700 italic mb-3">
                      "The engagement on these quotes is incredible. My audience loves them and I've seen a 40% increase in saves and shares since using this pack."
                    </p>
                    <div className="text-blue-600 font-medium">— Mike R., Entrepreneur</div>
                  </CardContent>
                </Card>
                
                <Card className="bg-purple-50 border-purple-200">
                  <CardContent className="p-6">
                    <p className="text-purple-700 italic mb-3">
                      "I love having the different formats. The Canva templates make it so easy to customize with my brand colors. Professional quality!"
                    </p>
                    <div className="text-purple-600 font-medium">— Jessica L., Social Media Manager</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <DownloadCard
              title="50 Motivational Quotes Pack"
              description="Get all 50 engagement-tested quotes in 6 ready-to-share formats. Perfect for content creators and motivation lovers."
              fileUrl="/freebies/quotes-pack/motivational_quotes_pack.zip"
              fileSize="3.2MB"
              badge="viral-ready"
              emoji="🔥"
              features={[
                "50 proven quotes",
                "5 themed categories", 
                "6 different formats",
                "Social media graphics",
                "Canva templates",
                "Phone wallpapers"
              ]}
              ctaText="Free Instant Download"
            />
          </div>
        </div>
      </div>
    </div>
  )
}