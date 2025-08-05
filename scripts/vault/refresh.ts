import * as fs from "fs";
import * as path from "path";
import { buildVaultIndex } from "./build_index.js"; // ESM-compatible

console.log("🔄 Refreshing Vault index...");

const VAULT_DIR = path.resolve("public", "vault-content");
const OUTPUT_FILE = path.resolve("public", "vault-index.json");

try {
  const index = buildVaultIndex(VAULT_DIR); // ✅ missing in your upload
  console.log("🧪 Index content:", index);   // debug log

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(index, null, 2));
  console.log("✅ Vault index rebuilt successfully.");
} catch (err) {
  console.error("❌ Failed to rebuild Vault index:", err);
  process.exit(1);
}

