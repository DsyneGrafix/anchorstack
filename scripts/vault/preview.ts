import { buildVaultIndex } from './build_index.js';
console.log("🔎 Vault Preview:");
console.log(JSON.stringify(buildVaultIndex("public/vault-content"), null, 2));
