#!/bin/bash

# Define paths
DATE=$(date +%Y-%m-%d)
SRC_DIR="$HOME/anchorstack"
DEST_DIR="$HOME/Desktop"
ZIP_NAME="anchorstack-backup-$DATE.zip"

# Create the zip
zip -r "$DEST_DIR/$ZIP_NAME" "$SRC_DIR"

# Optional: Keep only the last 7 backups
cd "$DEST_DIR"
ls -tp anchorstack-backup-*.zip | grep -v '/$' | tail -n +8 | xargs -r rm --
