# Math by UKG Lab

Math by UKG Lab is now structured as a production-style full-stack mathematics learning platform.

```txt
React + TypeScript + Vite
        -> REST API
Go + Gin + GORM
        -> PostgreSQL
```

Production targets:

```txt
Frontend: https://math.ukglab.com
Backend:  https://api.math.ukglab.com
```

## Folder Structure

```txt
frontend/   React, TypeScript, Vite, Tailwind, KaTeX, React Query
backend/    Go, Gin, GORM, PostgreSQL migrations, REST APIs
docker-compose.yml
.env.example
.github/       CI and GitHub Pages deployment workflows
.openai/       hosting project metadata
```

The current Math by UKG Lab UI, Class 9 dashboard, routes, branding, SEO helpers and responsive behavior are preserved under `frontend/`.

## Requirements

- Node.js 22+
- Go 1.26+
- Docker
- PostgreSQL 17+ or the provided Docker service

## Local Setup

Start PostgreSQL:

```bash
docker compose up postgres
```

If local port `5432` is already allocated, use another host port and match it in `DATABASE_URL`:

```bash
POSTGRES_PORT=55432 docker compose up postgres
DATABASE_URL=postgres://math:math@localhost:55432/math_ukglab?sslmode=disable
```

Docker host ports are configurable when another local service is already using the defaults:

```bash
POSTGRES_PORT=55432 BACKEND_PORT=8081 FRONTEND_PORT=5180 docker compose up --build
```

Run the Go API:

```bash
cd backend
go run ./cmd/server
```

Run the frontend:

```bash
cd frontend
npm install
npm run dev
```

Open:

```txt
http://localhost:5173
```

API base:

```txt
http://localhost:8080/api/v1
```

## Docker

Run PostgreSQL, backend and frontend together:

```bash
docker compose up --build
```

Health check:

```bash
curl http://localhost:8080/api/v1/health
```

Expected:

```json
{"status":"ok"}
```

## Environment

Copy `.env.example` as needed. Do not commit real `.env` files.

Backend variables:

```txt
APP_ENV
PORT
POSTGRES_PORT
BACKEND_PORT
FRONTEND_PORT
DATABASE_URL
JWT_SECRET
CORS_ALLOWED_ORIGINS
APP_AUTO_MIGRATE
APP_SEED_DATABASE
```

Frontend variables:

```txt
VITE_API_BASE_URL
VITE_BASE_PATH
```

## APIs

OpenAPI document:

```txt
http://localhost:8080/swagger/openapi.yaml
```

Docs landing page:

```txt
http://localhost:8080/swagger/index.html
```

Implemented endpoints:

```txt
GET /api/v1/health
GET /api/v1/classes
GET /api/v1/classes/9
GET /api/v1/classes/9/units
GET /api/v1/classes/9/units/:slug
GET /api/v1/units/:slug
GET /api/v1/chapters
GET /api/v1/classes/9/chapters/:slug
GET /api/v1/chapters/:slug
GET /api/v1/topics
GET /api/v1/topics/:slug
GET /api/v1/lessons/:slug
GET /api/v1/questions
GET /api/v1/questions/:slug
```

Question filters:

```txt
GET /api/v1/questions?class=9&topic=polynomial-vocabulary&difficulty=medium
```

## Database

SQL migrations live in `backend/migrations/`.

Initial schema includes:

- curricula
- classes
- units
- chapters
- topics
- lessons
- questions
- question_hints
- question_solution_steps

Future-ready tables include:

- users
- student_progress
- tests
- test_questions
- test_attempts
- student_answers
- bookmarks

Development startup can run migrations and seed the current NCERT Mathematics chapter map for Classes 9-12 automatically when:

```txt
APP_AUTO_MIGRATE=true
APP_SEED_DATABASE=true
```

## Verification

Frontend:

```bash
cd frontend
npm run lint
npm run build
```

Backend:

```bash
cd backend
go test ./...
go build ./cmd/server
```

## Notes

The frontend still contains local curriculum fallback data during the migration. Class 9 dashboard and unit pages now prefer API data when the backend is available, then fall back locally if it is not. This keeps the current website usable while the full backend migration continues.
