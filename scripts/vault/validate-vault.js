import fs from 'fs';

const data = JSON.parse(fs.readFileSync('public/vault-index.json', 'utf-8'));
const errors = data.filter(item => item.tier === 'Unknown' || !item.source);
console.log(`❗ Found ${errors.length} potential issues`);
if (errors.length) console.table(errors);
