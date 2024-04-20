#!/usr/bin/env sh

input_version="$1"

if [ "${RUNNER_OS}" = "Linux" ]; then
  bin_name=linux
  exec_name=umka
else
  bin_name=windows_mingw
  exec_name=umka.exe
fi
echo "umka-installed=$(if command -v "${exec_name}" >/dev/null 2>&1; then echo true; else echo false; fi)" >> "$GITHUB_OUTPUT"
mkdir -p "${GITHUB_WORKSPACE}/umka"
echo "umka-path=${GITHUB_WORKSPACE}/umka" >> "$GITHUB_OUTPUT"
file_name="umka_${input_version}"
if [ "${input_version}" != "1.3" ] && [ "${input_version}" != "1.3.1" ]; then
  file_name="${file_name}_x86-64"
fi
file_name="${file_name}_${bin_name}"
echo "file-name=${file_name}" >> "$GITHUB_OUTPUT"
