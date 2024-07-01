#!/bin/bash

if ! [ -x "$(command -v apt-get)" ]; then
  echo 'Error: apt-get is not installed.' >&2
  exit 1
fi

apt-get update
apt-get install -y \
  libnss3 \
  libnspr4 \
  libgbm1
