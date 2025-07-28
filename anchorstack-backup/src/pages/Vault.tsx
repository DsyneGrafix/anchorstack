// src/pages/Vault.tsx
import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

type VaultProduct = {
  id: string
  title: string
  description: string
  tier: 'free' | 'premium' | 'exclusive'
  url: string
  category: string
}

const vaultProducts: VaultProduct[] = [
  {
    id: 'calm-clarity-kit-7-day-edition',
    title: 'Calm Clarity Kit 7 Day Edition',
    description: 'Digital product from the AnchorStack Vault.',
    tier: 'mid tier',
    url: 'https://grafixartistry6.gumroad.com/l/nupwf',
    category: 'Creator Tool',
  },
  {
    id: 'launch-and-earn-combo-pack',
    title: 'Launch and Earn Combo Pack',
    description: 'Digital product from the AnchorStack Vault.',
    tier: 'mid tier',
    url: 'https://grafixartistry6.gumroad.com/l/jqzdtq',
    category: 'Self-Growth',
  },
  {
    id: 'the-clarity-core-bundle',
    title: 'The Clarity Core Bundle',
    description: 'Digital product from the AnchorStack Vault.',
    tier: 'mid tier',
    url: 'https://grafixartistry6.gumroad.com/l/msenf',
    category: 'Self-Growth',
  },
  {
    id: '7-days-to-clearer-thinking-printablepdf',
    title: '7 Days to Clearer Thinking Printable.pdf',
    description: 'Digital product from the AnchorStack Vault.',
    tier: 'top tier',
    url: 'https://grafixartistry6.gumroad.com',
    category: 'Self-Growth',
  },
  {
    id: 'boundaries-and-burnout-recovery',
    title: 'Boundaries and Burnout Recovery',
    description: 'Digital product from the AnchorStack Vault.',
    tier: 'top tier',
    url: 'https://grafixartistry6.gumroad.com',
    category: 'Self-Growth',
  },
  {
    id: 'habit-stack-starter-bundle-v2',
    title: 'Habit Stack Starter Bundle v2',
    description: 'Digital product from the AnchorStack Vault.',
    tier: 'top tier',
    url: 'https://grafixartistry6.gumroad.com',
    category: 'Self-Growth',
  },
  {
    id: 'high-speed-habits',
    title: 'High Speed Habits',
    description: 'Digital product from the AnchorStack Vault.',
    tier: 'top tier',
    url: 'https://grafixartistry6.gumroad.com',
    category: 'Self-Growth',
  },
  {
    id: 'the-clarity-core-bundle',
    title: 'The Clarity Core Bundle',
    description: 'Digital product from the AnchorStack Vault.',
    tier: 'top tier',
    url: 'https://grafixartistry6.gumroad.com/l/msenf',
    category: 'Self-Growth',
  },
  {
    id: 'the-clarity-tools-vault',
    title: 'The Clarity Tools Vault',
    description: 'Digital product from the AnchorStack Vault.',
    tier: 'top tier',
    url: 'https://grafixartistry6.gumroad.com/l/uebseh',
    category: 'Self-Growth',
  },
  {
    id: 'the-confidence-transformation',
    title: 'The Confidence Transformation',
    description: 'Digital product from the AnchorStack Vault.',
    tier: 'top tier',
    url: 'https://grafixartistry6.gumroad.com',
    category: 'Self-Growth',
  },
  {
    id: 'the-digital-distraction-cleanse',
    title: 'The Digital Distraction Cleanse',
    description: 'Digital product from the AnchorStack Vault.',
    tier: 'top tier',
    url: 'https://grafixartistry6.gumroad.com',
    category: 'Self-Growth',
  },
  {
    id: 'the-momentum-mapping-toolkit',
    title: 'The Momentum Mapping Toolkit',
    description: 'Digital product from the AnchorStack Vault.',
    tier: 'top tier',
    url: 'https://grafixartistry6.gumroad.com/l/npruu',
    category: 'Creator Tool',
  },
  {
    id: 'weekly-reset-rituals',
    title: 'Weekly Reset Rituals',
    description: 'Digital product from the AnchorStack Vault.',
    tier: 'top tier',
    url: 'https://grafixartistry6.gumroad.com',
    category: 'Self-Growth',
  },
  {
    id: 'work-life-integration-mastery',
    title: 'Work Life Integration Mastery',
    description: 'Digital product from the AnchorStack Vault.',
    tier: 'top tier',
    url: 'https://grafixartistry6.gumroad.com/l/lapqw',
    category: 'Self-Growth',
  },
  {
    id: 'the-phoenix-principle-template',
    title: 'The Phoenix Principle Template',
    description: 'Digital product from the AnchorStack Vault.',
    tier: 'premium',
    url: 'https://grafixartistry6.gumroad.com',
    category: 'Self-Growth',
  },
  {
    id: 'gumroad-growth-planner-kit',
    title: 'Gumroad Growth Planner Kit',
    description: 'Digital product from the AnchorStack Vault.',
    tier: 'premium',
    url: 'https://grafixartistry6.gumroad.com',
    category: 'Creator Tool',
  },
  {
    id: 'claude-copywriters-kit---vault-edition',
    title: 'Claude Copywriters Kit – Vault Edition',
    description: 'Digital product from the AnchorStack Vault.',
    tier: 'exclusive',
    url: 'https://grafixartistry6.gumroad.com',
    category: 'Creator Tool',
  },
  {
    id: 'next-book-starter-kit',
    title: 'Next Book Starter Kit',
    description: 'Digital product from the AnchorStack Vault.',
    tier: 'premium',
    url: 'https://grafixartistry6.gumroad.com',
    category: 'Creator Tool',
  },
  {
    id: 'journal-generator-script-kit',
    title: 'Journal Generator Script Kit',
    description: 'Digital product from the AnchorStack Vault.',
    tier: 'free',
    url: 'https://grafixartistry6.gumroad.com',
    category: 'Creator Tool',
  },
  {
    id: 'ava-toolkit-(netlify-edition)',
    title: 'AVA Toolkit (Netlify Edition)',
    description: 'Digital product from the AnchorStack Vault.',
    tier: 'free',
    url: 'https://grafixartistry6.gumroad.com',
    category: 'Creator Tool',
  },
];

const Vault: React.FC = () => {
  return (
    <div className="p-6 sm:p-10">
      <h1 className="text-3xl font-bold mb-6">📦 AnchorStack Vault</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {vaultProducts.map(product => (
          <Card key={product.id} className="hover:shadow-lg transition-all">
            <CardHeader>
              <CardTitle>{product.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{product.description}</p>
              <a href={product.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                View on Gumroad →
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Vault
