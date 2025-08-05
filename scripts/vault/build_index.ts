import * as fs from "fs";
import * as path from "path";

const tierDefaults: Record<string, { tier: string; value: string }> = {
  bronze: { tier: "Bronze", value: "$5" },
  silver: { tier: "Silver", value: "$15" },
  gold: { tier: "Gold", value: "$29" },
  platinum: { tier: "Platinum", value: "$49" }
};


// 🔁 Recursively collect all file paths
function getAllFiles(dirPath: string, arrayOfFiles: string[] = []): string[] {
  const entries = fs.readdirSync(dirPath);

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry);
    if (fs.statSync(fullPath).isDirectory()) {
      getAllFiles(fullPath, arrayOfFiles);
    } else {
      arrayOfFiles.push(fullPath);
    }
  }

  return arrayOfFiles;
}

export function buildVaultIndex(dirPath: string) {
  const files = getAllFiles(dirPath);
  const index = [];

  for (const fullPath of files) {
    const file = path.basename(fullPath);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) continue;
    if (file.endsWith(".json") || file.startsWith("vault_index")) continue;

    const content = fs.readFileSync(fullPath, "utf-8");

    const matchTitle = content.match(/title:\s*(.+)/i);
    const matchTier = content.match(/tier:\s*(.+)/i);
    const matchValue = content.match(/value:\s*(.+)/i);
    const matchCategory = content.match(/category:\s*(.+)/i);
    const matchStatus = content.match(/status:\s*(.+)/i);
    const matchDropDate = content.match(/dropsOn:\s*(.+)/i);

    const parentFolder = path.basename(path.dirname(fullPath));
    const fallback = tierDefaults[parentFolder] || { tier: "Unknown", value: "$0" };

    index.push({
      filename: file,
      title: matchTitle?.[1] ?? path.basename(file, path.extname(file)),
      tier: matchTier?.[1] ?? fallback.tier,
      value: matchValue?.[1] ?? fallback.value,
      category: matchCategory?.[1] ?? "Uncategorized",
      status: matchStatus?.[1] ?? "draft",
      dropsOn: matchDropDate?.[1] ?? "TBD",
      source: path.relative(dirPath, fullPath).replace(/\\/g, "/"),
    });
  }

  return index;
}

