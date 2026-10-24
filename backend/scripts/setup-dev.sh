#!/usr/bin/env bash
# One-time local setup: starts Postgres and Redis with Docker, then migrates and seeds.
set -euo pipefail
cd "$(dirname "$0")/.."

[ -f .env ] || { cp .env.example .env; echo "Created backend/.env from .env.example"; }

docker compose -f ../docker-compose.yml up -d postgres redis

echo "Waiting for Postgres..."
until docker compose -f ../docker-compose.yml exec -T postgres pg_isready -U portfolio >/dev/null 2>&1; do
  sleep 1
done

npm install
npx prisma migrate deploy
npm run db:seed

echo "Done. Start the API with: npm run dev"
