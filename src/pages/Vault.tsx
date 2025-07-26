import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import React from 'react'

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
    id: 'clarity-core',
    title: 'The Clarity Core Bundle',
    description: 'Get to the root of clarity with this signature bundle.',
    tier: 'premium',
    url: 'https://grafixartistry6.gumroad.com/l/msenf',
    category: 'Productivity'
  },
  {
    id: 'momentum-mapping',
    title: 'Momentum Mapping Toolkit',
    description: 'Visually track and build your productivity momentum.',
    tier: 'exclusive',
    url: 'https://grafixartistry6.gumroad.com/l/npruu',
    category: 'Planning'
  }
]

const Vault = () => (
  <div className="p-6 sm:p-10">
    <h1 className="text-3xl font-bold mb-6">🔐 AnchorStack Vault</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {vaultProducts.map(product => (
        <Card key={product.id} className="hover:shadow-lg transition-all">
          <CardHeader>
            <CardTitle>{product.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{product.description}</p>
            <a href={product.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              View Product →
            </a>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
)

export default Vault
