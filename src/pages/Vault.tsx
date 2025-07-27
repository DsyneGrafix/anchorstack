import React from 'react';
import VaultTile from '@/components/VaultTile';

const Vault: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🔓 Vault Access</h1>
      <VaultTile
        title="Work-Life Integration Mastery"
        tier="premium" // valid tier type
      />
    </div>
  );
};

export default Vault;

