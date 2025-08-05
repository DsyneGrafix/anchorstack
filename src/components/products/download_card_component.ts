// src/components/DownloadCard.tsx
import React from 'react'
import { Download, Gift, Star, Zap } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

interface DownloadCardProps {
  title: string
  description: string
  fileUrl: string
  fileSize?: string
  badge?: 'free' | 'premium' | 'exclusive' | 'viral-ready'
  emoji?: string
  features?: string[]
  ctaText?: string
}

const badgeConfig = {
  free: {
    icon: Gift,
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    textColor: 'text-green-800',
    badgeColor: 'bg-green-100',
    label: 'FREE DOWNLOAD'
  },
  premium: {
    icon: Star,
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    textColor: 'text-blue-800',
    badgeColor: 'bg-blue-100',
    label: 'PREMIUM'
  },
  exclusive: {
    icon: Star,
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    textColor: 'text-purple-800',
    badgeColor: 'bg-purple-100',
    label: 'EXCLUSIVE'
  },
  'viral-ready': {
    icon: Zap,
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    textColor: 'text-orange-800',
    badgeColor: 'bg-orange-100',
    label: 'VIRAL READY'
  }
}

export const DownloadCard: React.FC<DownloadCardProps> = ({
  title,
  description,
  fileUrl,
  fileSize = '2MB',
  badge = 'free',
  emoji = '📥',
  features = [],
  ctaText = 'Instant Download'
}) => {
  const config = badgeConfig[badge]
  const IconComponent = config.icon

  const handleDownload = () => {
    // Track download
    if (typeof gtag !== 'undefined') {
      gtag('event', 'file_download', {
        file_name: fileUrl.split('/').pop(),
        file_extension: fileUrl.split('.').pop(),
        link_url: fileUrl
      })
    }
    
    // Trigger download
    const link = document.createElement('a')
    link.href = fileUrl
    link.download = fileUrl.split('/').pop() || 'download'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <Card className={`sticky top-4 ${config.bgColor} ${config.borderColor} border-2`}>
      <CardContent className="p-6">
        {/* Badge */}
        <div className={`
          ${config.badgeColor} ${config.textColor}
          px-3 py-1 rounded-full text-xs font-bold
          flex items-center justify-center space-x-1 mb-4
        `}>
          <IconComponent className="w-3 h-3" />
          <span>{config.label}</span>
        </div>

        {/* Title */}
        <div className="text-center mb-4">
          <div className="text-2xl mb-2">{emoji}</div>
          <h3 className={`font-bold text-lg ${config.textColor} mb-2`}>
            {title}
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Features */}
        {features.length > 0 && (
          <div className="mb-4">
            <div className="space-y-2">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2 text-sm">
                  <div className={`w-2 h-2 rounded-full ${config.textColor.replace('text-', 'bg-')}`} />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* File Info */}
        <div className="flex justify-between items-center text-xs text-gray-500 mb-4">
          <span>📦 ZIP File</span>
          <span>📊 {fileSize}</span>
        </div>

        {/* Download Button */}
        <Button
          onClick={handleDownload}
          className={`w-full ${config.textColor.replace('text-', 'bg-').replace('-800', '-600')} hover:${config.textColor.replace('text-', 'bg-').replace('-800', '-700')} text-white font-bold py-3`}
        >
          <Download className="w-4 h-4 mr-2" />
          {ctaText}
        </Button>

        {/* Trust Signals */}
        <div className="mt-4 text-center">
          <div className="text-xs text-gray-500 space-y-1">
            <div>✅ No email required</div>
            <div>✅ Instant access</div>
            <div>✅ Commercial use OK</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}