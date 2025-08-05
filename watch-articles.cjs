const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');

const ARTICLES_ROOT = path.resolve(__dirname, 'docs/articles');
const INDEX_FILE = path.join(ARTICLES_ROOT, 'index.md');

function rebuildIndex() {
  const folders = fs.readdirSync(ARTICLES_ROOT).filter(f =>
    fs.statSync(path.join(ARTICLES_ROOT, f)).isDirectory()
  );

  console.log('♻️ Rebuilding category-based sidebar and index.md...');
  console.log('🔍 Found folders:', folders);

  let lines = ['# 📚 Articles\n'];

  let totalArticles = 0;

  for (const folder of folders) {
    const folderPath = path.join(ARTICLES_ROOT, folder);
    const files = fs.readdirSync(folderPath).filter(f => f.endsWith('.md'));

    if (files.length === 0) continue;

    lines.push(`\n## ${folder.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}\n`);

    for (const file of files) {
      const title = file.replace(/\.md$/, '').replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpper

