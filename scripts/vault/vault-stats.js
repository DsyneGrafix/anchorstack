import fs from 'fs';

const data = JSON.parse(fs.readFileSync('public/vault-index.json', 'utf-8'));
const tiers = {};
data.forEach(item => {
  const tier = item.tier || 'Unknown';
  tiers[tier] = (tiers[tier] || 0) + 1;
});
console.log("📊 Vault Stats by Tier:");
console.table(tiers);
