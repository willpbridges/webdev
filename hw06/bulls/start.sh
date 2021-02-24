#!/bin/bash

export MIX_ENV=prod
export PORT=4792

CFGD=$(readlink -f ~/.config/bulls)

if [ ! -e "$CFGD/base" ]; then
    echo "Need to deploy first"
    exit 1
fi

SECRET_KEY_BASE=$(cat "$CFGD/base")
export SECRET_KEY_BASE

echo "Stopping old copy of app, if any..."

_build/prod/rel/bulls/bin/bulls stop || true

echo "Starting app..."

_build/prod/rel/bulls/bin/bulls start
