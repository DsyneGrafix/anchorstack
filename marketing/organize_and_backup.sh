#!/bin/bash
# organize_and_backup.sh
# Usage: ./organize_and_backup.sh

# Base project directory (adjust as needed)
BASE_DIR="$HOME/GoogleDrive/Project_Organization"
BACKUP_DIR="$BASE_DIR/Backups/$(date +'%Y%m%d')"
mkdir -p "$BACKUP_DIR"

# Loop through each project and archive its drafts and chapters
for PROJECT in $(ls "$BASE_DIR"); do
    if [ -d "$BASE_DIR/$PROJECT" ]; then
        echo "Backing up $PROJECT..."
        tar -czf "$BACKUP_DIR/${PROJECT}_$(date +'%Y%m%d').tar.gz" \
            -C "$BASE_DIR" "$PROJECT/Drafts" "$PROJECT/Chapters"
    fi
done

echo "Backup complete. Archives stored in $BACKUP_DIR."

