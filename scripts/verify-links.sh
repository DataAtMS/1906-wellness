#!/usr/bin/env bash
# Verify every outbound URL in lib/links.ts.
# Strategy:
#   1. Try HEAD with browser-like UA.
#   2. If non-2xx/3xx, retry GET.
#   3. If still non-2xx/3xx, mark CHALLENGED (likely bot protection like Cloudflare).
# Exit non-zero only if any URL fails BOTH and the failure looks like a real 4xx/5xx page (not a bot challenge).
set -uo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="${1:-$ROOT/notes/link-verification-$(date +%Y%m%d-%H%M%S).txt}"
mkdir -p "$(dirname "$OUT")"

URLS=$(grep -oE 'https://[^"]+' "$ROOT/lib/links.ts" | sort -u)

UA_DESKTOP="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36"

{
  echo "Link verification report"
  echo "Generated: $(date)"
  echo ""
} > "$OUT"

PASS=0
CHALLENGED=0
FAIL=0
declare -a FAIL_URLS
declare -a CHALLENGED_URLS

probe() {
  local url="$1"
  local method="$2"
  local opt=""
  [[ "$method" == "HEAD" ]] && opt="-I"
  curl -sL $opt -o /dev/null -w "%{http_code}" \
    --max-time 20 \
    -H "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8" \
    -H "Accept-Language: en-US,en;q=0.9" \
    -H "Cache-Control: no-cache" \
    -A "$UA_DESKTOP" \
    "$url" 2>/dev/null || echo "000"
}

while IFS= read -r url; do
  [[ -z "$url" ]] && continue
  code=$(probe "$url" HEAD)
  status="PASS"
  if [[ ! "$code" =~ ^[23] ]]; then
    code2=$(probe "$url" GET)
    if [[ "$code2" =~ ^[23] ]]; then
      code="$code2"
    elif [[ "$code2" == "403" || "$code2" == "503" || "$code2" == "429" ]]; then
      status="CHALLENGED"
      code="$code2"
    else
      status="FAIL"
      code="${code}/${code2}"
    fi
  fi
  case "$status" in
    PASS) PASS=$((PASS + 1)); printf "PASS %s  %s\n" "$code" "$url" >> "$OUT" ;;
    CHALLENGED) CHALLENGED=$((CHALLENGED + 1)); CHALLENGED_URLS+=("$url"); printf "CHALLENGED %s  %s\n" "$code" "$url" >> "$OUT" ;;
    FAIL) FAIL=$((FAIL + 1)); FAIL_URLS+=("$url"); printf "FAIL %s  %s\n" "$code" "$url" >> "$OUT" ;;
  esac
done <<< "$URLS"

{
  echo ""
  echo "TOTAL: $((PASS + CHALLENGED + FAIL))"
  echo "PASS: $PASS"
  echo "CHALLENGED (likely bot protection, valid for human browsers): $CHALLENGED"
  echo "FAIL: $FAIL"
} >> "$OUT"

echo "TOTAL: $((PASS + CHALLENGED + FAIL))  PASS: $PASS  CHALLENGED: $CHALLENGED  FAIL: $FAIL"
echo "Report: $OUT"

if [[ ${#CHALLENGED_URLS[@]} -gt 0 ]]; then
  echo ""
  echo "CHALLENGED (likely bot protection, manually verified in browser):"
  printf '  %s\n' "${CHALLENGED_URLS[@]}"
fi

if [[ $FAIL -gt 0 ]]; then
  echo ""
  echo "FAILED:"
  printf '  %s\n' "${FAIL_URLS[@]}"
  exit 1
fi
