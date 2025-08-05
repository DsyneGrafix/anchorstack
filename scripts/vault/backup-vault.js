import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const now = new Date().toISOString().split('T')[0];
const backupFile = path.resolve(process.env.HOME || '.', 'Desktop', `anchorstack_backup_${now}.zip`);

execSync(`zip -r ${backupFile} . -x "*.git*" "node_modules/*"`, { stdio: 'inherit' });
console.log(`✅ Backup created at: ${backupFile}`);
