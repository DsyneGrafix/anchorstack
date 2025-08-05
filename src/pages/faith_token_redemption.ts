// src/pages/FaithToken.tsx - Hidden Faith Token Redemption Page
import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { CheckCircle, Download, Heart } from 'lucide-react'

export const FaithToken: React.FC = () => {
  const [email, setEmail] = useState('')
  const [isRedeemed, setIsRedeemed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleRedeem = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call to track redemption
    setTimeout(() => {
      setIsRedeemed(true)
      setIsLoading(false)
      
      // Track faith token redemption
      console.log('Faith Token Redeemed:', {
        email,
        timestamp: new Date().toISOString(),
        source: 'levitical-priesthood'
      })
      
      // Add to email list (integrate with ConvertKit/Mailchimp)
      // Add bonus points to user profile
    }, 1000)
  }

  if (isRedeemed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full border-amber-200 shadow-lg">
          <CardContent className="text-center py-12">
            <div className="mb-6">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                ☩ Faith Token Redeemed!
              </h1>
              <p className="text-lg text-gray-600">
                "The priesthood is not just a calling—it is a covering."
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 border border-amber-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  🎁 Your Bonus Reward
                </h3>
                <p className="text-gray-600 mb-4">
                  You've unlocked a special mini-study on the priesthood of all believers, 
                  plus exclusive access to our Sacred Strategy token design templates.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button 
                    className="bg-amber-600 hover:bg-amber-700"
                    onClick={() => window.open('/downloads/priesthood-bonus-study.pdf', '_blank')}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Bonus Study
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => window.open('/downloads/token-templates.zip', '_blank')}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Get Token Templates
                  </Button>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">
                  🪙 Ready for Physical Tokens?
                </h3>
                <p className="text-blue-700 mb-4">
                  Take your Sacred Strategy to the next level with our beautiful wooden token set.
                </p>
                <Button 
                  variant="outline"
                  className="border-blue-300 text-blue-700 hover:bg-blue-100"
                  onClick={() => window.open('https://gumroad.com/l/sacred-strategy-tokens', '_blank')}
                >
                  View Token Collection
                </Button>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-500 mb-2">
                  Keep exploring for more hidden tokens...
                </p>
                <Button 
                  variant="link"
                  onClick={() => window.location.href = '/vault'}
                >
                  Return to Vault
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full border-purple-200 shadow-lg">
        <CardHeader className="text-center">
          <div className="mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl text-white">☩</span>
            </div>
            <CardTitle className="text-2xl text-gray-900">
              Faith Token Found!
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-6">
            <p className="text-lg font-medium text-gray-800 mb-2">
              "The priesthood is not just a calling—it is a covering."
            </p>
            <p className="text-sm text-gray-600">
              You discovered a hidden Faith Token in the Levitical Priesthood study. 
              Redeem it below for exclusive bonus content!
            </p>
          </div>

          <form onSubmit={handleRedeem} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter your email to redeem"
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-purple-600 hover:bg-purple-700"
              disabled={isLoading}
            >
              {isLoading ? 'Redeeming...' : 'Redeem Faith Token'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              <Heart className="w-3 h-3 inline mr-1" />
              Faith tokens are hidden throughout our content as rewards for engaged readers
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}