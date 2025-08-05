"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path_1 = require("path");
var build_index_js_1 = require("./build_index.js"); // .js or omit in real ESM builds
console.log("🔄 Refreshing Vault index...");
var VAULT_DIR = path_1.default.resolve("vault-content");
var OUTPUT_FILE = path_1.default.resolve("public", "vault-index.json");
try {
    var index = (0, build_index_js_1.buildVaultIndex)(VAULT_DIR);
    fs_1.default.writeFileSync(OUTPUT_FILE, JSON.stringify(index, null, 2));
    console.log("✅ Vault index rebuilt successfully.");
}
catch (err) {
    console.error("❌ Failed to rebuild Vault index:", err);
    process.exit(1);
}
