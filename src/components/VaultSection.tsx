import React from 'react'

const VaultSection: React.FC = () => {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-bold mb-4">🔓 Product Vault</h2>
      <ul className="space-y-2">
        <li className="text-sm">
          <strong>Faith Token Tracker</strong> – Free • <a href="/downloads/faith_token_tracker.zip" className="text-blue-500 underline">Download</a>
        </li>
        <li className="text-sm">
          <strong>Sacred Strategy Planner</strong> – Free • <a href="/downloads/sacred_strategy.zip" className="text-blue-500 underline">Download</a>
        </li>
        <li className="text-sm">
          <strong>Digital Distraction Cleanse</strong> – Premium • <a href="/downloads/The Digital Distraction Cleanse.zip" className="text-blue-500 underline">Download</a>
        </li>
        <li className="text-sm">
          <strong>The Phoenix Principle</strong> – Exclusive • <a href="/downloads/The_Phoenix_Principle_Template.zip" className="text-blue-500 underline">Download</a>
        </li>
        <li className="text-sm">
          <strong>The Digital Disciple</strong> – Exclusive • <a href="/downloads/The_Digital_Disciple.zip" className="text-blue-500 underline">Download</a>
        </li>
      </ul>
    </section>
  )
}

export { VaultSection }

