#!/usr/bin/env sh

# removing 'v' prefix: v1.2.3 -> 1.2.3
tag="${1#v}"

os="linux"
if [ "${RUNNER_OS}" = "Windows" ]; then
  os="windows_mingw"
else
  chmod +x "${GITHUB_WORKSPACE}/umka/umka_${tag}_${os}/umka"
fi
echo "${GITHUB_WORKSPACE}/umka/umka_${tag}_${os}" >> "$GITHUB_PATH"
