#!/bin/bash

DEV=${1:-0}

if [ "$DEV" == "-d" ]; then
    echo "Running in development mode"
    docker compose down
    docker compose up --build
else
    echo "Running in production mode"
    docker compose up -d
    watch -n 1 "docker ps --format 'table {{.ID}}\t{{.Names}}\t{{.Status}}' | grep -v 'Up 0 seconds' | grep -v 'Exited'"
fi