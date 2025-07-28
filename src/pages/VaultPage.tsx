import React from 'react';
import { VaultTile } from '@/components/VaultTile';

const VaultPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🔓 AnchorStack Vault</h1>

      <VaultTile
        title="Clarity Master Bundle"
        tier="exclusive"
        description="Everything you need to build clarity and momentum."
        image="/images/masterbundle.jpg"
        ctaLink="/products/clarity-master"
      />

      <VaultTile
        title="Work-Life Integration Mastery"
        tier="premium"
        description="Achieve harmony between personal and professional life."
        image="/images/worklife.jpg"
        ctaLink="/products/work-life"
      />

      <VaultTile
        title="HustleMode Notion Command Center"
        tier="exclusive"
        description="A central hub to organize and launch your ideas fast."
        image="/images/notion-hustle.jpg"
        ctaLink="/products/hustlemode"
      />

      <VaultTile
        title="Calm Clarity Kit – 7-Day Edition"
        tier="premium"
        description="A peaceful reset for your daily focus and clarity."
        image="/images/clarity7.jpg"
        ctaLink="/products/calm-clarity"
      />

      <VaultTile
        title="AnchorStack Creator Vault"
        tier="exclusive"
        description="High-value templates and systems for serious creators."
        image="/images/creatorvault.jpg"
        ctaLink="/products/creator-vault"
      />

      <VaultTile
        title="The Most Important Women of the Bible"
        tier="premium"
        description="Explore the faith, courage, and legacy of biblical heroines like Eve, Deborah, Mary Magdalene, and more."
        image="/images/vault/biblical_women_cover.jpg"
        ctaLink="/downloads/Vault_Product_Biblical_Women.zip"
      />
    </div>
  );
};

export default VaultPage;

