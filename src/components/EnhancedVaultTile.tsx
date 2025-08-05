import React from 'react';
import { trackVaultClick } from '@/utils/analytics_utils';

interface VaultTileProps {
  title: string;
  tier: 'Free' | 'Premium' | 'Exclusive';
  emoji: string;
  description: string;
  link: string;
}

export const EnhancedVaultTile: React.FC<VaultTileProps> = ({
  title,
  tier,
  emoji,
  description,
  link,
}) => {
  return (
    <div className="border rounded-xl p-4 shadow-sm dark:bg-gray-800">
      <div className="text-3xl mb-2">{emoji}</div>
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{description}</p>
      <a
        href={link}
        download
        className="inline-block text-sm font-bold text-blue-600 hover:underline"
        onClick={() => trackVaultClick(title)}
      >
        Download
      </a>
      
<div className={`mt-2 inline-block px-2 py-1 text-xs font-semibold rounded-full ${
    tier === 'Free'
      ? 'bg-green-200 text-green-800'
      : tier === 'Premium'
      ? 'bg-yellow-200 text-yellow-800'
      : 'bg-purple-200 text-purple-800'
  }`}
>
  {tier}
</div>

    </div>
  );
};

export type { VaultTileProps };
