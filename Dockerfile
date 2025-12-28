# --------------------------
# Stage 1: Build the React app
# --------------------------
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Build the app (Vite outputs to 'dist')
RUN npm run build

# --------------------------
# Stage 2: Production with Nginx
# --------------------------
FROM nginx:alpine

# Copy built assets from build stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy env template for runtime variable injection
COPY env-config.template.js /usr/share/nginx/html/env-config.js

# Copy entrypoint script
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Expose port 80
EXPOSE 80

# Start entrypoint script
CMD ["/entrypoint.sh"]
