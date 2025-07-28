import React from 'react'

const VaultSection: React.FC = () => {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-bold mb-4">🔓 Product Vault</h2>
      <ul className="space-y-2">
        <li className="text-sm">
          <strong>Digital Distraction Cleanse</strong> – FocusPremium
        </li>
        <li className="text-sm">
          <strong>Notion Creator OS</strong> – ProductivityPremium
        </li>
        <li className="text-sm">
          <strong>Creator Flywheel System</strong> – BusinessExclusive
        </li>
        <li className="text-sm">
          <strong>Focus Session Starter</strong> – FocusFree
        </li>
      </ul>
    </section>
  )
}

export { VaultSection }

