#!/usr/bin/env sh

UMKA_LANG_REPO="vtereshkov/umka-lang"

curl -sL \
  -H "Accept: application/vnd.github+json" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  "https://api.github.com/repos/${UMKA_LANG_REPO}/releases/latest" > result.json
