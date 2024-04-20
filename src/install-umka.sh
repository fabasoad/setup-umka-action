#!/usr/bin/env sh

# removing 'v' prefix: v1.2.3 -> 1.2.3
tag="${1#v}"
dir="$2"

suffix=""
if [ "${tag}" != "1.3" ] && [ "${tag}" != "1.3.1" ]; then
  suffix="_x86-64"
fi

os="linux"
if [ "${RUNNER_OS}" = "Windows" ]; then
  os="windows_mingw"
else
  chmod +x "${GITHUB_WORKSPACE}/${dir}/umka_${tag}${suffix}_${os}/umka"
fi
echo "${GITHUB_WORKSPACE}/${dir}/umka_${tag}${suffix}_${os}" >> "$GITHUB_PATH"
