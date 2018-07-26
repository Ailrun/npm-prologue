#!/usr/bin/env bash
set -ev

case $TASK_TYPE in
    "test")
        npm install > /dev/null
        ;;
esac

set +ev
