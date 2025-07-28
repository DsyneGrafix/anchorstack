
import React from 'react';

interface VaultTileProps {
  title: string;
  description: string;
  badge?: string;
}

const VaultTile: React.FC<VaultTileProps> = ({ title, description, badge }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
      <h4 className="text-lg font-bold">{title}</h4>
      <p className="text-sm text-gray-600 dark:text-gray-300">{description}</p>
      {badge && (
        <span className="inline-block mt-2 text-xs bg-yellow-200 text-yellow-900 px-2 py-1 rounded uppercase font-semibold tracking-wide">
          {badge}
        </span>
      )}
    </div>
  );
};

export default VaultTile;
