// src/types/merch.ts
export interface MerchItem {
  id: string
  title: string
  description: string
  price: number
  category: 'bootyquest' | 'anchorstack' | 'combo'
  tier: 'free' | 'mid' | 'high'
  imageUrl: string
  shopUrl: string
  unlockCondition?: {
    type: 'quest_complete' | 'vault_access' | 'timer_sessions'
    value: string | number
  }
  isUnlocked?: boolean
  rewardCode?: string
}

// src/components/MerchRewardModal.tsx
import React from 'react'
import { Gift, ExternalLink, Copy } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

interface MerchRewardModalProps {
  isOpen: boolean
  onClose: () => void
  merchItem: MerchItem
  rewardCode: string
}

export const MerchRewardModal: React.FC<MerchRewardModalProps> = ({
  isOpen,
  onClose,
  merchItem,
  rewardCode
}) => {
  const copyCode = () => {
    navigator.clipboard.writeText(rewardCode)
    // Could add toast notification here
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="max-w-md w-full bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-300">
        <CardContent className="p-6 text-center">
          <div className="text-4xl mb-4">🏴‍☠️</div>
          <h2 className="text-xl font-bold text-orange-900 mb-2">
            Treasure Unlocked!
          </h2>
          <p className="text-orange-700 mb-4">
            You've earned exclusive access to:
          </p>
          
          <div className="bg-white rounded-lg p-4 mb-4 border border-orange-200">
            <h3 className="font-semibold text-gray-900">{merchItem.title}</h3>
            <p className="text-sm text-gray-600 mt-1">{merchItem.description}</p>
            {merchItem.tier === 'free' ? (
              <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded mt-2">
                FREE DOWNLOAD
              </span>
            ) : (
              <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded mt-2">
                EXCLUSIVE DISCOUNT
              </span>
            )}
          </div>

          <div className="bg-gray-100 rounded-lg p-3 mb-4">
            <p className="text-xs text-gray-600 mb-1">Your Reward Code:</p>
            <div className="flex items-center justify-between bg-white rounded px-3 py-2 border">
              <code className="text-sm font-mono text-gray-900">{rewardCode}</code>
              <Button
                onClick={copyCode}
                variant="ghost"
                size="sm"
                className="p-1 h-auto"
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="flex space-x-3">
            <Button
              onClick={() => window.open(merchItem.shopUrl, '_blank')}
              className="flex-1 bg-orange-600 hover:bg-orange-700"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Claim Treasure
            </Button>
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1"
            >
              Later
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// src/components/MerchTile.tsx
import React from 'react'
import { Lock, Gift, ExternalLink } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import type { MerchItem } from '@/types/merch'

interface MerchTileProps {
  item: MerchItem
  onUnlock?: (item: MerchItem) => void
}

export const MerchTile: React.FC<MerchTileProps> = ({ item, onUnlock }) => {
  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'free': return 'bg-green-50 border-green-200 text-green-800'
      case 'mid': return 'bg-blue-50 border-blue-200 text-blue-800'
      case 'high': return 'bg-purple-50 border-purple-200 text-purple-800'
      default: return 'bg-gray-50 border-gray-200 text-gray-800'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'bootyquest': return '🏴‍☠️'
      case 'anchorstack': return '⚓'
      case 'combo': return '🔥'
      default: return '🎁'
    }
  }

  return (
    <Card className={`transition-all duration-200 hover:shadow-lg ${
      item.isUnlocked ? 'cursor-pointer hover:scale-105' : 'opacity-75'
    }`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <span className="text-2xl">{getCategoryIcon(item.category)}</span>
          <span className={`text-xs px-2 py-1 rounded-full font-medium ${getTierColor(item.tier)}`}>
            {item.tier.toUpperCase()}
          </span>
        </div>

        <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>

        {item.isUnlocked ? (
          <Button
            onClick={() => window.open(item.shopUrl, '_blank')}
            className="w-full"
            size="sm"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            {item.tier === 'free' ? 'Download' : `$${item.price}`}
          </Button>
        ) : (
          <div className="flex items-center justify-center space-x-2 py-2 text-gray-500">
            <Lock className="w-4 h-4" />
            <span className="text-sm">
              {item.unlockCondition?.type === 'quest_complete' && 'Complete Quest'}
              {item.unlockCondition?.type === 'vault_access' && 'Unlock Vault'}
              {item.unlockCondition?.type === 'timer_sessions' && `${item.unlockCondition.value} Focus Sessions`}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// src/pages/Merch.tsx
import React, { useState } from 'react'
import { MerchTile } from '@/components/MerchTile'
import { MerchRewardModal } from '@/components/MerchRewardModal'
import { Card, CardContent } from '@/components/ui/Card'
import type { MerchItem } from '@/types/merch'

// Mock data - replace with your real merch catalog
const merchItems: MerchItem[] = [
  {
    id: 'founding-crew-tee',
    title: 'Founding Crew Tee',
    description: 'Limited edition shirt for early BootyQuest adventurers',
    price: 25,
    category: 'bootyquest',
    tier: 'high',
    imageUrl: '/images/founding-crew-tee.jpg',
    shopUrl: 'https://your-store.com/founding-crew-tee',
    unlockCondition: { type: 'quest_complete', value: 'treasure_map_1' },
    isUnlocked: true, // Set based on user progress
    rewardCode: 'CREW2024'
  },
  {
    id: 'pirate-map-poster',
    title: 'Treasure Map Poster',
    description: 'High-quality print of the complete BootyQuest world',
    price: 0,
    category: 'bootyquest',
    tier: 'free',
    imageUrl: '/images/treasure-map.jpg',
    shopUrl: 'https://your-store.com/free-map-download',
    unlockCondition: { type: 'vault_access', value: 'any' },
    isUnlocked: true,
    rewardCode: 'FREEMAP'
  },
  {
    id: 'focus-deck',
    title: 'AnchorStack Focus Cards',
    description: 'Physical deck for analog Pomodoro sessions',
    price: 15,
    category: 'anchorstack',
    tier: 'mid',
    imageUrl: '/images/focus-cards.jpg',
    shopUrl: 'https://your-store.com/focus-cards',
    unlockCondition: { type: 'timer_sessions', value: 25 },
    isUnlocked: false
  }
]

export const Merch: React.FC = () => {
  const [selectedReward, setSelectedReward] = useState<MerchItem | null>(null)

  const groupedMerch = merchItems.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = []
    acc[item.category].push(item)
    return acc
  }, {} as Record<string, MerchItem[]>)

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-anchor-900 mb-2">
          Treasure Trove
        </h1>
        <p className="text-anchor-600 max-w-2xl mx-auto">
          Unlock exclusive merch through your AnchorStack journey. Complete quests, 
          master focus sessions, and claim your rewards.
        </p>
      </div>

      {/* Progress Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-green-50 border-green-200">
          <CardContent className="text-center py-6">
            <div className="text-2xl font-bold text-green-600 mb-2">
              {merchItems.filter(item => item.isUnlocked && item.tier === 'free').length}
            </div>
            <div className="text-sm text-green-700">Free Treasures Unlocked</div>
          </CardContent>
        </Card>
        
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="text-center py-6">
            <div className="text-2xl font-bold text-blue-600 mb-2">
              {merchItems.filter(item => item.isUnlocked && item.tier !== 'free').length}
            </div>
            <div className="text-sm text-blue-700">Premium Access Earned</div>
          </CardContent>
        </Card>
        
        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="text-center py-6">
            <div className="text-2xl font-bold text-purple-600 mb-2">
              {merchItems.filter(item => !item.isUnlocked).length}
            </div>
            <div className="text-sm text-purple-700">Still to Unlock</div>
          </CardContent>
        </Card>
      </div>

      {/* Merch Categories */}
      {Object.entries(groupedMerch).map(([category, items]) => (
        <div key={category} className="space-y-4">
          <h2 className="text-xl font-semibold text-anchor-800 border-b border-anchor-200 pb-2 capitalize">
            {category === 'bootyquest' ? '🏴‍☠️ BootyQuest Collection' : 
             category === 'anchorstack' ? '⚓ AnchorStack Gear' : 
             '🔥 Combo Treasures'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <MerchTile
                key={item.id}
                item={item}
                onUnlock={() => setSelectedReward(item)}
              />
            ))}
          </div>
        </div>
      ))}

      {/* Reward Modal */}
      {selectedReward && (
        <MerchRewardModal
          isOpen={!!selectedReward}
          onClose={() => setSelectedReward(null)}
          merchItem={selectedReward}
          rewardCode={selectedReward.rewardCode || 'REWARD2024'}
        />
      )}
    </div>
  )
}