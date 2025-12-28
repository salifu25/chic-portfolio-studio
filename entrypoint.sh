#!/bin/sh

# Replace placeholder with environment variable
if [ -z "$VITE_API_URL" ]; then
  echo "VITE_API_URL not set, using default http://localhost:8080"
  export VITE_API_URL=http://localhost:8080
fi

# Replace placeholder in env-config.js
sed -i "s|__VITE_API_URL__|$VITE_API_URL|g" /usr/share/nginx/html/env-config.js

# Start nginx
nginx -g "daemon off;"