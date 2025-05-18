#!/bin/bash
set -e

# Find all emoji SVGs referenced in the source code
EMOJI_LIST=$(grep -rhoE "emoji/emoji_[^'\" ]+\.svg" src | sort | uniq | sed 's|emoji/||')

# Also include any emoji SVGs referenced in the scripts themselves (for future-proofing)
#EMOJI_LIST="$EMOJI_LIST\n$(grep -rhoE "emoji/emoji_[^'\" ]+\.svg" scripts | sort | uniq | sed 's|emoji/||')"

# Remove duplicates and empty lines
EMOJI_LIST=$(echo "$EMOJI_LIST" | sort | uniq | grep .)

# Copy each emoji from private/emoji to public/emoji
for emoji in $EMOJI_LIST; do
  if [ -f "private/emoji/$emoji" ]; then
    cp "private/emoji/$emoji" "public/emoji/$emoji"
    echo "Copied $emoji"
  else
    echo "Warning: $emoji not found in private/emoji" >&2
  fi
done 