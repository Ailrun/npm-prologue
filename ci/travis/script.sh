#!/usr/bin/env bash
set -ev

case $TASK_TYPE in
    "test")
        npm test
        ;;
esac

set +ev
