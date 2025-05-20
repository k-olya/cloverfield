#!/bin/bash

# Check if URL is provided
if [ -z "$1" ]; then
    echo "Usage: $0 ssh://username@host:port/path"
    exit 1
fi

# Parse the SSH URL
URL=$1
if [[ ! $URL =~ ^ssh://([^@]+)@([^:]+):([0-9]+)/(.+)$ ]]; then
    echo "Invalid SSH URL format. Expected format: ssh://username@host:port/path"
    exit 1
fi

USERNAME=${BASH_REMATCH[1]}
HOST=${BASH_REMATCH[2]}
PORT=${BASH_REMATCH[3]}
REMOTE_PATH=${BASH_REMATCH[4]}

# Check if build directory exists
if [ ! -d "build" ]; then
    echo "Error: build directory not found. Run 'npm run build' first."
    exit 1
fi

# Perform the rsync
echo "Deploying to $HOST:$REMOTE_PATH..."
rsync -avz -e "ssh -p $PORT" build/ "$USERNAME@$HOST:/$REMOTE_PATH"

# Check if rsync was successful
if [ $? -eq 0 ]; then
    echo "Deployment completed successfully!"
else
    echo "Deployment failed!"
    exit 1
fi 