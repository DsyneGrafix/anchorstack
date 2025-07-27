import React from 'react';

export interface VaultTileProps {
  title: string;
  tier: 'free' | 'premium' | 'exclusive';
}

export const VaultTile: React.FC<VaultTileProps> = ({ title, tier }) => {
  return (
    <div className="border rounded-xl p-4 shadow-md mb-4">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-sm text-gray-600 capitalize">Access Level: {tier}</p>
    </div>
  );
};

