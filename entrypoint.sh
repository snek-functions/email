#!/bin/sh

if [ $# -ne 1 ]; then
  echo "Start in continuous mode" 1>&2
  exec yarn sf-server
fi
export _HANDLER="$1"

RUNTIME_ENTRYPOINT=/var/runtime/bootstrap
if [ -z "${AWS_LAMBDA_RUNTIME_API}" ]; then
  exec /usr/local/bin/aws-lambda-rie $RUNTIME_ENTRYPOINT
else
  exec $RUNTIME_ENTRYPOINT
fi

# SPDX-License-Identifier: (EUPL-1.2)
# Copyright © 2019-2022 snek.at
