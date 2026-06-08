#!/usr/bin/env bash

npm install --save react-bootstrap bootstrap@5.0.0
npm install --save @types/react-router
npm install --save @types/react-router-dom
yarn build
tag_postfix="$(date +"%m-%d-%y")_r0"
podman build -t "ghcr.io/manimaul/t37.org:${tag_postfix}" .
#podman tag "ghcr.io/manimaul/t37.org:${tag_postfix}" "manimaul/t37.org:latest"
#podman push "ghcr.io/manimaul/t37.org:latest"
podman push "ghcr.io/manimaul/t37.org:${tag_postfix}"
