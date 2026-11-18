#!/bin/sh

# Exit immediately if a command exits with a non-zero status
set -e

echo "Waiting for PostgreSQL to start..."
# Uses the Python standard library: the slim image has no netcat.
until python -c "
import socket, sys
s = socket.socket()
s.settimeout(1)
sys.exit(0 if s.connect_ex(('db', 5432)) == 0 else 1)
"; do
  sleep 1
done
echo "PostgreSQL started"

# Always run migrations on startup
echo "Applying database migrations..."
python manage.py migrate --noinput

# Seed demo data when the database is empty. The command is idempotent.
echo "Checking if database needs seeding..."
USER_COUNT=$(python manage.py shell -c "from django.contrib.auth.models import User; print(User.objects.count())" | tail -n 1)

if [ "$USER_COUNT" = "0" ]; then
    echo "Database is empty. Creating demo data..."
    python manage.py seed_demo
else
    echo "Database already has data (found $USER_COUNT users). Skipping seed."
fi

# Execute the main command (from CMD in Dockerfile or docker-compose)
exec "$@"
