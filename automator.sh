#!/bin/bash

# --- Limitless Kreationz: GitHub Automation Script ---
# Version: 7.8 (Full-Stack Engineer Edition)
# Profile: QueenBeeKarmaT83

# 1. Initialize local repository
git init

# 2. Add all studio files (index.js, package.json, styles, etc.)
git add .

# 3. Commit with the Sovereign Architect signature
git commit -m "Initial Build: Neural Studio v7.8 - QueenBeeKarmaT83"

# 4. Rename branch to main
git branch -M main

# 5. Connect to the specified Source of Truth (Your GitHub Profile)
# NOTE: Replace 'YOUR-REPO-NAME' with the actual name of the repo you created on GitHub
REMOTE_URL="https://github.com/QueenBeeKarmaT83/neural-studio.git"

echo "Connecting to: $REMOTE_URL"

# Check if origin already exists, if so, update it; otherwise, add it.
if git remote | grep -q 'origin'; then
    git remote set-url origin "$REMOTE_URL"
else
    git remote add origin "$REMOTE_URL"
fi

# 6. Final Push to Cloud
echo "--------------------------------------------------------"
echo "ATTENTION ARCHITECT: Pushing to QueenBeeKarmaT83 Profile"
echo "--------------------------------------------------------"
echo "Executing: git push -u origin main"

git push -u origin main

echo "--------------------------------------------------------"
echo "Automation Complete. Check Vercel for live deployment."
echo "--------------------------------------------------------"


