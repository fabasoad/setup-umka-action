#!/usr/bin/env sh

file_name="$1"
umka_path="$1"

unzip "${file_name}.zip"
rm -f "${file_name}.zip"
if [ "${RUNNER_OS}" != "Windows" ]; then
  chmod +x "${umka_path}/${file_name}/umka"
fi
echo "${umka_path}/${file_name}" >> "$GITHUB_PATH"
