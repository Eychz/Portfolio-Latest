# Portfolio-Latest

Personal portfolio of Harold Catipay: a Next.js site with an Express API and an admin dashboard for managing content.

```
portfolio-latest/
├── backend/            Express 5 + Prisma (PostgreSQL) + Redis API
│   ├── prisma/         schema, migrations, seed + seed content
│   ├── scripts/        shell helpers (local setup)
│   ├── src/
│   │   ├── config/        env validation and app settings
│   │   ├── controllers/   HTTP layer: read request, call service, send response
│   │   ├── lib/           Prisma, Redis and logger clients
│   │   ├── middleware/    auth, validation, caching, rate limiting, errors
│   │   ├── repositories/  database queries (Prisma)
│   │   ├── routes/        route definitions
│   │   ├── schemas/       zod request schemas
│   │   ├── scripts/       TS maintenance scripts (create admin, flush cache)
│   │   ├── services/      business logic and cache invalidation
│   │   ├── types/         shared TypeScript types
│   │   ├── utils/         small helpers
│   │   ├── app.ts         Express app (middleware + routes)
│   │   └── server.ts      starts the server, graceful shutdown
│   └── tests/          API tests (Vitest + Supertest)
├── frontend/           Next.js 16 (App Router) + Tailwind v4 + shadcn/ui
│   ├── app/
│   │   ├── (admin)/admin/ admin dashboard (login, projects, certificates, messages)
│   │   ├── (public)/      public pages (about, projects, certificates, ...)
│   │   ├── api/           proxy to the Express API + cache revalidation
│   │   ├── layout.tsx, page.tsx, robots.ts, sitemap.ts
│   ├── components/  contexts/  data/  hooks/  lib/  public/  scripts/  styles/  utils/
│   └── proxy.ts        redirects signed-out visitors away from /admin
└── docker-compose.yml  PostgreSQL + Redis for local development
```

## How it fits together

- **Public pages** are server-rendered by Next.js and cached for 60 seconds. They read projects and certificates from the API. If the API is down, they fall back to the bundled content in `frontend/data/`, so the site never goes blank.
- **The API** caches public `GET` responses in Redis (`X-Cache: HIT/MISS`). Any create, update or delete clears the matching cache. Redis is optional: without it the API simply runs uncached.
- **The admin dashboard** at `/admin` signs in through the API, which sets an httpOnly session cookie (JWT). The browser talks only to the Next.js origin; `app/api/[...path]` forwards requests to Express, so no CORS setup is needed. After every change the admin refreshes the cached public pages.
- **The contact form** stores messages in the database (rate-limited, with a honeypot against bots); they show up under Admin → Messages.

## Getting started

Requirements: Node 20+, and either Docker or local PostgreSQL 16 + Redis.

```bash
# 1. Database + cache
docker compose up -d

# 2. API (http://localhost:4000)
cd backend
cp .env.example .env        # then set JWT_SECRET and ADMIN_PASSWORD
npm install
npx prisma migrate deploy
npm run db:seed             # loads projects/certificates and creates the admin user
npm run dev

# 3. Site (http://localhost:3000)
cd ../frontend
cp .env.example .env.local
npm install
npm run dev
```

`backend/scripts/setup-dev.sh` runs steps 1–2 for you (except `npm run dev`).

Sign in at http://localhost:3000/admin with `ADMIN_EMAIL` / `ADMIN_PASSWORD` from `backend/.env`.

## Useful commands

| Where | Command | What it does |
|---|---|---|
| backend | `npm run dev` | API with auto-reload |
| backend | `npm test` | API tests (uses a separate `<db>_test` database) |
| backend | `npm run typecheck` | TypeScript check |
| backend | `npm run db:migrate` | create a migration after editing `schema.prisma` |
| backend | `npm run db:studio` | browse the database in Prisma Studio |
| backend | `npm run admin:create -- you@mail.com password` | add an admin or reset a password |
| backend | `npm run cache:flush` | clear the Redis cache |
| frontend | `npm run dev` / `build` / `lint` / `typecheck` | usual Next.js tasks |
| frontend | `npm run optimize-images -- <file-or-folder> public/Mockups` | convert new images to WebP |

## API overview

| Method | Path | Auth |
|---|---|---|
| GET | `/api/health` | – |
| GET | `/api/projects?type=&featured=&category=&search=&page=&pageSize=` | – |
| GET | `/api/projects/:slug` | – |
| GET | `/api/certificates?category=` · `/api/certificates/:slug` | – |
| POST | `/api/contact` | – (rate-limited) |
| POST | `/api/auth/login` · `/api/auth/logout` · GET `/api/auth/me` | login is rate-limited |
| GET/POST | `/api/admin/projects` · GET/PATCH/DELETE `/api/admin/projects/:id` | admin |
| GET/POST | `/api/admin/certificates` · GET/PATCH/DELETE `/api/admin/certificates/:id` | admin |
| GET | `/api/admin/messages` · PATCH/DELETE `/api/admin/messages/:id` | admin |
| GET | `/api/admin/stats` | admin |

## Deploying

- **Frontend:** Vercel with the project root set to `frontend/`. Set `BACKEND_URL` and `NEXT_PUBLIC_SITE_URL`.
- **Backend:** any Node host (Render, Railway, Fly.io). Run `npm run build && npm run db:deploy`, then start with `npm start`. Set the variables from `backend/.env.example`, using a long random `JWT_SECRET` and your production `CORS_ORIGINS`.
