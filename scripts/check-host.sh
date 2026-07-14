#!/usr/bin/env bash
#
# check-host.sh — is this host fit to run the Bybit agent?
#
# Bybit's CDN blocks by SOURCE IP (US, Mainland China, and many datacenter
# ranges -> HTTP 403). This script checks, from wherever you run it, whether
# Bybit's API is actually reachable — so you can vet a candidate VPS in ~5
# seconds BEFORE installing anything. Run it ON the VPS, not from your laptop.
#
# Usage:
#   ./check-host.sh                       # test mainnet + testnet
#   ./check-host.sh https://api.bybit.ae  # also test your regional endpoint (primary)
#
# Exit: 0 = primary endpoint reachable (host usable); 1 = blocked/unusable.

set -u

if [ -t 1 ]; then
  R=$'\e[31m'; G=$'\e[32m'; Y=$'\e[33m'; B=$'\e[1m'; N=$'\e[0m'
else
  R=""; G=""; Y=""; B=""; N=""
fi

command -v curl >/dev/null 2>&1 || {
  echo "${R}curl is required but not installed.${N} Install it first (e.g. apt-get install -y curl)."
  exit 2
}

TIMEOUT=20

# probe <url> -> sets CODE and BODY (first ~140 chars, single line)
probe() {
  local url="$1" out
  out=$(curl -sS -m "$TIMEOUT" -w $'\n%{http_code}' "$url" 2>&1) || true
  CODE=$(printf '%s' "$out" | tail -n1)
  BODY=$(printf '%s' "$out" | sed '$d' | tr -d '\r' | tr '\n' ' ' | cut -c1-140)
}

echo "${B}== Bybit host reachability check ==${N}"
echo

# 1) Egress identity — general connectivity + which country/IP Bybit will see.
IP=$(curl -sS -m "$TIMEOUT" https://ipinfo.io/ip 2>/dev/null | tr -d '[:space:]')
COUNTRY=$(curl -sS -m "$TIMEOUT" https://ipinfo.io/country 2>/dev/null | tr -d '[:space:]')
ORG=$(curl -sS -m "$TIMEOUT" https://ipinfo.io/org 2>/dev/null | tr -d '\r\n')
if [ -n "$IP" ]; then
  echo "Egress IP : ${B}${IP}${N}"
  echo "Country   : ${B}${COUNTRY:-?}${N}   Network: ${ORG:-?}"
else
  echo "${Y}Could not reach ipinfo.io — check basic outbound connectivity first.${N}"
fi
echo

# 2) Bybit endpoints. Primary decides the verdict (regional arg if given).
PRIMARY_URL="${1:-https://api.bybit.com}"
PRIMARY_URL="${PRIMARY_URL%/}"
primary_ok=1

check_bybit() {
  local label="$1" base="$2" is_primary="$3"
  probe "${base%/}/v5/market/time"
  local status
  case "$CODE" in
    200)
      status="${G}OK (200)${N}"
      [ "$is_primary" = "1" ] && primary_ok=0
      ;;
    403)
      if printf '%s' "$BODY" | grep -qi "your country"; then
        status="${R}BLOCKED (403, geo-block)${N}"
      else
        status="${R}BLOCKED (403)${N}"
      fi
      ;;
    000|"") status="${Y}NO RESPONSE (timeout/DNS)${N}" ;;
    *)      status="${Y}HTTP ${CODE} (unexpected)${N}" ;;
  esac
  printf '  %-28s %s\n' "$label" "$status"
}

echo "Bybit API reachability:"
if [ -n "${1:-}" ]; then
  check_bybit "$PRIMARY_URL (primary)" "$PRIMARY_URL" 1
  check_bybit "api.bybit.com (mainnet)" "https://api.bybit.com" 0
else
  check_bybit "api.bybit.com (mainnet)" "https://api.bybit.com" 1
fi
check_bybit "api-testnet.bybit.com" "https://api-testnet.bybit.com" 0
echo

# 3) Verdict.
if [ "$primary_ok" -eq 0 ]; then
  echo "${G}${B}VERDICT: USABLE${N} — this host reaches Bybit. Proceed with docs/DEPLOY.md."
  exit 0
fi

echo "${R}${B}VERDICT: BLOCKED${N} — do not deploy the agent here."
case "$COUNTRY" in
  US|CN)
    echo "  Reason: ${COUNTRY} is a restricted jurisdiction for Bybit. Use a host"
    echo "  in a permitted region (e.g. UAE, EEA)." ;;
  "")
    echo "  Couldn't confirm country; the endpoint did not return 200 regardless." ;;
  *)
    echo "  Country ${COUNTRY} may be permitted, but this IP is likely in a flagged"
    echo "  datacenter range. Try a different provider/region, or recreate the VM"
    echo "  for a fresh IP." ;;
esac
echo "  See docs/DEPLOY.md for host selection."
exit 1
