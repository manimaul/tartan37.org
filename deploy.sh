#!/bin/bash
set -e
echo "Building site..."
yarn build

echo "Uploading to ${T37_HOST}..."
scp -P "$T37_PORT" -r dist/* "${T37_USER}@${T37_HOST}:${T37_REMOTE_DIR}"

echo "Deploy complete."
