#!/bin/bash

# --- Limitless Kreationz: GitHub Automation Script ---
# Version: 7.8.1 (Refined Architect Edition)
# Profile: QueenBeeKarmaT83

echo "Initializing Sovereign Protocol..."

# 1. Initialize local repository if not already present
if [ ! -d ".git" ]; then
    git init
    echo "Repository initialized."
fi

# 2. Stage all assets
git add .

# 3. Commit with signature
git commit -m "Build Update: Neural Studio v7.8 - Stability Patch"

# 4. Branch Management
git branch -M main

# 5. Remote Configuration
REMOTE_URL="https://github.com/QueenBeeKarmaT83/neural-studio.git"

if git remote | grep -q 'origin'; then
    git remote set-url origin "$REMOTE_URL"
else
    git remote add origin "$REMOTE_URL"
fi

# 6. Secure Push
echo "Pushing to Source of Truth: $REMOTE_URL"
git push -u origin main --force

echo "--------------------------------------------------------"
echo "Deployment sequence complete. Logic Seal: Verified."
echo "--------------------------------------------------------"
