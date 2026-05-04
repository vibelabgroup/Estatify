#!/bin/sh

# Create database directory if it doesn't exist
echo "Setting up SQLite database..."
mkdir -p /app/prisma

# Run database migrations
echo "Running database migrations..."
npm run prisma:migrate

# Run database seed
echo "Running database seed..."
npm run prisma:seed

# Start the application
echo "Starting the application..."
npm start
