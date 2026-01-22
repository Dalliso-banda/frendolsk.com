#!/bin/sh
set -e

echo "🚀 Starting application..."

# Run database migrations
echo "📋 Running database migrations..."
if node /app/migrate.js; then
  echo "✅ Migrations complete"
else
  echo "⚠️ Migration failed, but continuing startup..."
fi

# Seed admin user if credentials provided
if [ -n "$ADMIN_EMAIL" ] && [ -n "$ADMIN_PASSWORD" ]; then
  echo "👤 Ensuring admin user exists..."
  node /app/seed-admin.js || echo "⚠️ Admin seeding skipped or failed"
fi

# Start the application
echo "🌐 Starting Next.js server..."
exec node server.js
