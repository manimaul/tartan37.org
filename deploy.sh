#!/bin/bash
set -e
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

echo "Backing up Fleet"
scp -P "$T37_PORT" -r "${T37_USER}@${T37_HOST}:${T37_REMOTE_DIR}/fleet.json" "${DIR}/public/fleet.json"
scp -P "$T37_PORT" -r "${T37_USER}@${T37_HOST}:${T37_REMOTE_DIR}/fleetimg" "${DIR}/public"

echo "Building site..."
yarn build

scp -P "$T37_PORT" -r public/book_pages/* "${T37_USER}@${T37_HOST}:${T37_REMOTE_DIR}/book_pages"
scp -P "$T37_PORT" -r public/techres/* "${T37_USER}@${T37_HOST}:${T37_REMOTE_DIR}/techres"

echo "Uploading to ${T37_HOST}..."
scp -P "$T37_PORT" -r dist/assets/* "${T37_USER}@${T37_HOST}:${T37_REMOTE_DIR}/assets"
scp -P "$T37_PORT" -r dist/index.html "${T37_USER}@${T37_HOST}:${T37_REMOTE_DIR}"
scp -P "$T37_PORT" -r dist/manifest.json "${T37_USER}@${T37_HOST}:${T37_REMOTE_DIR}"
scp -P "$T37_PORT" -r dist/robots.txt "${T37_USER}@${T37_HOST}:${T37_REMOTE_DIR}"
scp -P "$T37_PORT" -r dist/favicon.ico "${T37_USER}@${T37_HOST}:${T37_REMOTE_DIR}"

## Uncomment to upload php / email changes
#scp -P "$T37_PORT" -r *.php "${T37_USER}@${T37_HOST}:${T37_REMOTE_DIR}"
#scp -P "$T37_PORT" -r email_templates "${T37_USER}@${T37_HOST}:${T37_REMOTE_DIR}"

echo "Deploy complete."
