#!/bin/bash
# Double-click to lock the hub with a team password (or to change the password).
cd "$(dirname "$0")" || exit 1
if ! command -v node >/dev/null 2>&1; then
  echo "This needs Node.js. Install it from https://nodejs.org, then double-click this again."
  read -r -p "Press Return to close this window."; exit 1
fi
node lock.mjs
echo
read -r -p "Press Return to close this window."
