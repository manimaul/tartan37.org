#!/bin/bash
set -e

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

echo "Backing up from ${T37_HOST}..."
mkdir "${DIR}/backup"
scp -P "$T37_PORT" -r "${T37_USER}@${T37_HOST}:${T37_REMOTE_DIR}" "${DIR}/backup"

echo "Backup complete."
