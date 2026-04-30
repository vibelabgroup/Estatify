# Stage 1: Build the application
FROM node:22-alpine as builder

WORKDIR /app

# Copy package files and install dependencies
# We use npm install instead of ci in case package-lock is out of sync or missing
COPY package*.json ./
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the Vite project
RUN npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:alpine

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx configuration for SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port (internal container port)
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
