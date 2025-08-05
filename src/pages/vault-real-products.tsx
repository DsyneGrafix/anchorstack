import React from 'react'
import { VaultTile } from '../components/VaultTile'

const vaultItems = [
  {
    emoji: '🎁',
    title: 'Turning Your Gifts into Ministry',
    description: 'How to turn your God-given talents into impact.',
    link: '/vault-content/motivational/turning_gifts_into_ministry_article.html',
    tier: 'free',
  },
  {
    emoji: '⚡',
    title: 'From Doubt to Determination',
    description: 'Encouragement for discouraged creatives.',
    link: '/vault-content/motivational/doubt_to_determination_article.html',
    tier: 'free',
  },
  {
    emoji: '🕊️',
    title: 'Rest as a Sacred Strategy',
    description: 'Finding peace and productivity in spiritual rest.',
    link: '/vault-content/motivational/rest_faith_creators_article.html',
    tier: 'free',
  },
]

const VaultRealProducts: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">🗂️ The Vault</h1>
      {vaultItems.map((item, idx) => (
        <VaultTile key={idx} {...item} />
      ))}
    </div>
  )
}

export default VaultRealProducts

