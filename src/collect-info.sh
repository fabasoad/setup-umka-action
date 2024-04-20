#!/usr/bin/env sh

installed="false"
if command -v umka >/dev/null 2>&1; then
  installed="true"
fi

echo "umka-installed=${installed}" >> "$GITHUB_OUTPUT"
