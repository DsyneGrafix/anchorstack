// src/components/VaultTile.tsx
import React from 'react'
import { ExternalLink, Star, Lock, Gift } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import type { VaultProduct } from '@/types'

interface VaultTileProps {
  product: VaultProduct
}

export const VaultTile: React.FC<VaultTileProps> = ({ product }) => {
  const getTierConfig = (tier: string) => {
    switch (tier) {
      case 'free':
        return {
          badge: 'FREE',
          icon: Gift,
          borderColor: 'border-green-200',
          bgColor: 'bg-green-50',
          textColor: 'text-green-700',
          buttonColor: 'bg-green-500 hover:bg-green-600'
        }
      case 'premium':
        return {
          badge: 'PREMIUM',
          icon: Star,
          borderColor: 'border-blue-200',
          bgColor: 'bg-blue-50',
          textColor: 'text-blue-700',
          buttonColor: 'bg-blue-500 hover:bg-blue-600'
        }
      case 'exclusive':
        return {
          badge: 'EXCLUSIVE',
          icon: Lock,
          borderColor: 'border-purple-200',
          bgColor: 'bg-purple-50',
          textColor: 'text-purple-700',
          buttonColor: 'bg-purple-500 hover:bg-purple-600'
        }
      default:
        return {
          badge: 'PRODUCT',
          icon: Star,
          borderColor: 'border-anchor-200',
          bgColor: 'bg-anchor-50',
          textColor: 'text-anchor-700',
          buttonColor: 'bg-anchor-500 hover:bg-anchor-600'
        }
    }
  }

  const config = getTierConfig(product.tier)
  const IconComponent = config.icon

  const handleClick = () => {
    // Analytics tracking (optional)
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'vault_product_click', {
        product_id: product.id,
        product_title: product.title,
        product_tier: product.tier,
        product_category: product.category
      })
    }
    
    window.open(product.url, '_blank')
  }

  return (
    <Card 
      className={`${config.borderColor} hover:shadow-lg transition-all duration-200 cursor-pointer group`}
      onClick={handleClick}
    >
      <CardContent className="p-0">
        {/* Header with tier badge */}
        <div className={`${config.bgColor} px-4 py-3 border-b ${config.borderColor}`}>
          <div className="flex items-center justify-between">
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.textColor} bg-white/70`}>
              <IconComponent className="w-3 h-3 mr-1" />
              {config.badge}
            </span>
            <div className={`p-1 rounded-full bg-white/50 group-hover:bg-white/80 transition-colors`}>
              <ExternalLink className={`w-4 h-4 ${config.textColor}`} />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          <div>
            <h3 className="font-semibold text-anchor-900 text-lg leading-tight group-hover:text-primary-700 transition-colors">
              {product.title}
            </h3>
            <p className="text-sm text-anchor-600 mt-1 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs font-medium text-anchor-500 bg-anchor-100 px-2 py-1 rounded">
              {product.category}
            </span>
            
            <button
              className={`inline-flex items-center px-3 py-1.5 rounded-md text-white text-sm font-medium transition-colors ${config.buttonColor}`}
              onClick={(e) => {
                e.stopPropagation()
                handleClick()
              }}
            >
              {product.tier === 'free' ? 'Get Free' : 'View Product'}
              <ExternalLink className="w-3 h-3 ml-1" />
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}