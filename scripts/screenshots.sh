#!/usr/bin/env bash
# Headless Chrome screenshots of the live site.
# Usage: bash scripts/screenshots.sh <base-url>
set -euo pipefail

BASE="${1:?usage: screenshots.sh <base-url>}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUTDIR="$ROOT/notes/screenshots"
mkdir -p "$OUTDIR"

CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

# Pick two sample article slugs (first cannabis + first wellness).
SAMPLE_CANN=$(ls "$ROOT/content/cannabis" 2>/dev/null | head -1 | sed 's/\.md$//')
SAMPLE_WELL=$(ls "$ROOT/content/wellness" 2>/dev/null | head -1 | sed 's/\.md$//')

declare -a PAGES=(
  "/|home"
  "/cannabis|cannabis-index"
  "/cannabis-links|cannabis-links"
  "/wellness|wellness-index"
  "/wellness-links|wellness-links"
)
[[ -n "$SAMPLE_CANN" ]] && PAGES+=("/cannabis/$SAMPLE_CANN|cannabis-sample")
[[ -n "$SAMPLE_WELL" ]] && PAGES+=("/wellness/$SAMPLE_WELL|wellness-sample")

for entry in "${PAGES[@]}"; do
  IFS='|' read -r path name <<< "$entry"
  url="${BASE%/}$path"
  out="$OUTDIR/${name}.png"
  echo "SHOT $url -> $out"
  "$CHROME" --headless=new --disable-gpu --no-sandbox \
    --hide-scrollbars --window-size=1440,2400 \
    --screenshot="$out" "$url" 2>/dev/null
done

echo ""
echo "Screenshots written to: $OUTDIR"
ls -la "$OUTDIR"
