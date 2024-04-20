#!/usr/bin/env sh

# removing ".zip" from path
path=${1%.*}
if [ "${RUNNER_OS}" != "Windows" ]; then
  chmod +x "${path}/umka"
fi
echo "${path}" >> "$GITHUB_PATH"
