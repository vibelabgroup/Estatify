#!/bin/sh

# Wait for database to be ready
echo "Waiting for database to be ready..."
while ! nc -z postgres 5432; do
  sleep 1
done
echo "Database is ready!"

# Run database migrations
echo "Running database migrations..."
npm run prisma:migrate

# Run database seed
echo "Running database seed..."
npm run prisma:seed

# Start the application
echo "Starting the application..."
npm start
