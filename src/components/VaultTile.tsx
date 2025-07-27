import React from 'react';

export interface VaultTileProps {
  title: string;
  tier: 'free' | 'premium' | 'exclusive';
  description?: string;
  image?: string;
  ctaLink?: string;
}

export const VaultTile: React.FC<VaultTileProps> = ({
  title,
  tier,
  description,
  image,
  ctaLink,
}) => {
  return (
    <div className="border rounded-xl p-4 shadow-md mb-4 bg-white dark:bg-gray-900">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 capitalize mb-2">
        Access Level: {tier}
      </p>
      {description && (
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">{description}</p>
      )}
      {image && (
        <img
          src={image}
          alt={title}
          className="w-full h-auto rounded-lg mb-2"
        />
      )}
      {ctaLink && (
        <a
          href={ctaLink}
          className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
        >
          Learn More →
        </a>
      )}
    </div>
  );
};

export default VaultTile;

