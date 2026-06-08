#!/usr/bin/env bash

yarn build
tag_postfix="$(date +"%m-%d-%y")_r0"
podman build  --platform linux/amd64 -t "ghcr.io/manimaul/t37.org:${tag_postfix}" .
#podman tag "ghcr.io/manimaul/t37.org:${tag_postfix}" "manimaul/t37.org:latest"
#podman push "ghcr.io/manimaul/t37.org:latest"
podman push "ghcr.io/manimaul/t37.org:${tag_postfix}"
