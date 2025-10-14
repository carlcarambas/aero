#!/usr/bin/env sh

echo "Starting the app locally..."

firebase use aero-racehub

export FIREBASE_AUTH_EMULATOR_HOST='127.0.0.1:9099'
export FIREBASE_STORAGE_EMULATOR_HOST='127.0.0.1:9199'

# Firebase Service Account is need or the app will crash locally
# export GOOGLE_APPLICATION_CREDENTIALS=$(pwd)/config/local/firebase-service-account-dev.json

# Start the app
nx run api:start-local
