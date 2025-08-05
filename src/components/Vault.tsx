import React from 'react';
import { VaultProduct } from '@/types';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export const VaultTile: React.FC<{ product: VaultProduct }> = ({ product }) => {
  return (
    <Card className="mb-4">
      <div className="flex flex-col gap-2 p-4">
        <h3 className="text-xl font-bold">{product.title}</h3>
        <p className="text-gray-600 dark:text-gray-400">{product.description}</p>
        <Button asChild>
          <a href={product.url} target="_blank" rel="noopener noreferrer">
            Access Now
          </a>
        </Button>
      </div>
    </Card>
  );
};

