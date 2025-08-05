import React from 'react'
import { tiles } from '@/data/tiles'
import { vaultProducts } from '../data/vault_with_real_products'


const Vault = () => {
  return (
    <div className="p-4 md:p-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">🧰 Vault Access</h1>
        <p className="text-lg text-center text-gray-600 mb-10">
          Explore exclusive downloads, sacred tools, and clarity-driven resources to anchor your journey.
        </p>

        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {tiles.map((tile, idx) => (
            <VaultTile
              key={idx}
              title={tile.title}
              emoji={tile.emoji}
              description={tile.description}
              tier={tile.tier}
              link={tile.link}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
import { OpinionPoll } from '../components/opinion_poll_widget'

<OpinionPoll />


export default Vault

