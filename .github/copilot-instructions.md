# Repository Copilot Instructions

## Repository Overview

**math-ukglab** ("Math by UKG Lab") is a full-stack mathematics learning platform. It serves a curriculum browser (classes -> units -> chapters -> topics -> lessons -> questions) with NCERT Mathematics content for Classes 9-12 (Class 9 dashboard is the current UI focus). Production targets named in the README: `https://math.ukglab.com` (frontend) and `https://api.math.ukglab.com` (backend).

## Technology Stack

- Backend: Go (`go 1.26.6` in `backend/go.mod`, module `math-ukglab/backend`), Gin, GORM with the pgx PostgreSQL driver
- Database: PostgreSQL (17-alpine in compose), SQL migrations in `backend/migrations/`
- Frontend: React 19, TypeScript 5.8, Vite 7, Tailwind CSS 3, React Router 7, TanStack React Query 5, KaTeX/react-katex, zod, lucide-react
- Lint/format: ESLint 9 with typescript-eslint (`--max-warnings=0`); `go vet`
- Containers: Dockerfiles for backend and frontend, `docker-compose.yml`
- CI/CD: GitHub Actions `ci.yml` and `deploy.yml` (GitHub Pages); `.openai/hosting.json` holds hosting project metadata (do not edit)

## Repository Structure

```
backend/
  cmd/server/main.go        entrypoint; routes under /api/v1; serves /swagger/*
  internal/
    config/                 env-based config (+ config_test.go)
    database/               connection, models, migrations runner, seed
    middleware/             cors, logger, request_id
    httpjson/               shared JSON error helper
    class/ unit/ chapter/ topic/ lesson/ question/   one package per domain: handler.go, service.go, repository.go
    auth/ admin/ progress/ test/ curriculum/         placeholder packages (doc.go only, not implemented)
  migrations/               001..005 SQL files
  docs/openapi.yaml         OpenAPI document
frontend/src/               api/, components/, hooks/, math/, styles/, types/
frontend/scripts/           generate-pages-fallback.mjs, prepare-sites-output.mjs
docker-compose.yml, .env.example
```

## Architecture

Layered Go REST API: handler (Gin, parsing and HTTP mapping) -> service (logic) -> repository (GORM), one package per domain, wired in `cmd/server/main.go`. The React SPA calls the REST API via `frontend/src/api`. Currently implemented endpoints are read-only `GET`s under `/api/v1` (health, classes, units, chapters, topics, lessons, questions, with question filters `class`, `topic`, `difficulty`). Auth, admin, progress and tests packages, plus tables for users/progress/tests, are groundwork only.

## Development Commands

```bash
docker compose up postgres                 # database only (POSTGRES_PORT=55432 if 5432 is taken)
cd backend && go run ./cmd/server          # API on :8080
cd frontend && npm install && npm run dev  # UI on :5173
docker compose up --build                  # everything

cd backend && go vet ./... && go test ./... && go build ./cmd/server   # what CI runs
cd frontend && npm run lint && npm run typecheck && npm run build     # CI also runs `npm run test`
curl http://localhost:8080/api/v1/health   # expects {"status":"ok"}
```

Set `APP_AUTO_MIGRATE=true` and `APP_SEED_DATABASE=true` for development startup to migrate and seed the NCERT chapter map.

## Coding Guidelines

Go:
- Follow the per-domain package layout (`handler.go` / `service.go` / `repository.go`) and register routes via each handler's `RegisterRoutes(*gin.RouterGroup)`.
- Return errors up; map them to HTTP status in handlers. Success bodies are `{"data": ...}`; errors use `httpjson.Error(c, status, "CODE", "message")`, which emits `{"error":{"code","message"}}`. Do not invent other shapes.
- Validate path/query input in the handler (for example numeric `classNumber`); do not let GORM errors leak to clients.
- Keep `gofmt`-clean, small functions, explicit error handling, no globals for state.

TypeScript/React:
- Functional components and hooks; server state through React Query; validate API payloads with zod where the code already does.
- Strict typing; avoid `any`. Reuse components and Tailwind utility patterns already present.
- Math content renders through KaTeX; preserve existing rendering helpers in `src/math`.

## Testing

- Go: only `backend/internal/config/config_test.go` exists. Add table-driven `_test.go` files next to new logic; run `go test ./...`.
- Frontend: there is no unit-test runner. `npm run test` is `tsc -b --pretty false`, i.e. type-checking only. Do not describe it as behavioral testing.

## API / Data Rules

- REST under `/api/v1`; slugs are the public identifiers for units, chapters, topics, lessons and questions, and slugs are scoped by curriculum (see migration `005_scope_curriculum_slugs.sql`).
- Schema changes are new numbered SQL migrations in `backend/migrations/` (next is `006_...`); never edit an applied migration. Keep `internal/database/models.go` and seed data consistent with migrations.
- When adding or changing an endpoint, update `backend/docs/openapi.yaml` and the README endpoint list.

## Security

- `JWT_SECRET`, `DATABASE_URL` and CORS origins come from environment variables (`.env.example`). The compose values (`math/math`, `change-me-for-local-development`) are local development defaults only; never use them in production and never commit real `.env` files.
- CORS is controlled by `CORS_ALLOWED_ORIGINS` (middleware/cors.go). No authentication is implemented yet; do not present endpoints as protected.

## Infrastructure / Deployment

Docker Compose for local development. GitHub Actions: `ci.yml` (frontend lint/typecheck/test/build; backend `go mod download`, `go vet`, `go test`, `go build`) and `deploy.yml` (frontend build to GitHub Pages using `VITE_BASE_PATH`/`VITE_API_BASE_URL`).

## Change Guidelines

1. Understand the existing implementation first.
2. Make the smallest coherent change.
3. Preserve current architecture unless there is a strong reason to change it.
4. Do not introduce a new library when the existing stack already solves the requirement.
5. Update tests for behavior changes.
6. Run relevant tests/build before considering the change complete.
7. Do not leave commented-out code.
8. Do not leave TODO placeholders unless explicitly requested.
9. Do not fabricate implementation status.
10. Do not claim something was tested unless it was actually executed.

## Code Quality Rules

- Prefer readable code over clever code; avoid unnecessary duplication and abstraction.
- Follow existing naming conventions (Go: exported `Handler`/`Service`/`Repository` per package; TS: existing component naming).
- Keep functions and components focused; handle edge cases (unknown slug, non-numeric class, empty result sets).
- Preserve backward compatibility of API paths and response shapes; the SPA depends on them.
- Avoid unrelated refactoring during focused changes.

## Git Commit Rules

- Never add a `Co-Authored-By` trailer unless I explicitly request it.
- Never add Claude, Anthropic, GitHub Copilot, OpenAI, ChatGPT, Codex, Cursor, or any AI tool as an author or co-author.
- Use only the configured Git `user.name` and `user.email`.
- Do not mention AI assistance in commit messages.
- Keep commit messages concise and professional.
- Do not commit automatically unless I explicitly ask.
- Do not push automatically unless I explicitly ask.
- Never force-push unless I explicitly request it.
- Never rewrite Git history unless I explicitly request it.

## AI Assistant Working Rules

When working in this repository:

- Inspect existing code before proposing architecture changes.
- Do not assume a feature exists without verifying it.
- Do not create fake implementations to make UI or tests appear complete.
- Do not generate random metrics, scores, or placeholder business data unless explicitly requested as test/demo data.
- Clearly separate verified behavior from assumptions.
- Prefer completing working vertical slices over creating many unfinished placeholders.
- Preserve repository conventions.
- Avoid massive rewrites unless explicitly requested.
- When fixing a bug, identify the underlying cause where practical.
- When adding functionality, consider error handling and tests.
- Never expose secrets, API keys, tokens, or credentials.
- Never hardcode secrets.

## Repository-Specific Rules (educational content)

- Mathematical correctness is the core requirement. Never invent questions, hints, solution steps, chapter maps or curriculum structure; content must come from the seed data/migrations or from sources the maintainer provides. Verify any formula or worked solution before adding it.
- Do not fabricate student progress, scores or test results; the progress/test/auth features are not implemented.
- Keep the Class 9 UI, routes, branding, SEO helpers and responsive behavior intact unless asked to change them.
- Keep KaTeX output accessible and legible on mobile.
