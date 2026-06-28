# AGENTS.md

## Architecture

NestJS monorepo (TypeORM + MySQL 8). REST and GraphQL share entities/services/DTOs/entities via `libs/core`. Reference structure at `kahoy.md`.

**Current state:** In transition from flat NestJS CLI scaffold to monorepo layout:
```
apps/rest/       — REST API (Express + Swagger)
apps/graphql/    — GraphQL API (Apollo)
libs/core/       — shared entities, DTOs, services
config/jsquota/  — TypeORM datasource, migrations, seeds
```

## Key conventions

- **Workflow**: files are proposed → user-approved → written, per the `codegen-review` skill in `.opencode/skills/`. Never write a file without showing it first.
- **Change records**: after a feature completes, write a summary to `zdocs/records/` (versioned: `v001-*.md`).
- Feature specs: `zdocs/zzplan.md`. DB schema: `zdocs/zdocs.md`.
- Prettier: `singleQuote`, `trailingComma: 'all'`. ESLint: `no-explicit-any: off`.

## TypeORM

- **v1.0.0** is the correct/current major release (not a typo).
- Dev: `synchronize: true`, `autoLoadEntities: true`.
- CLI migrations: use the datasource at `config/jsquota/jsquota.datasource.ts` (points to `dist/` paths).

## Database

MySQL runs via docker-compose. `.env` must exist (gitignored) with:
```
DB_HOST=mysql
DB_PORT=3306
DB_USERNAME=jsquota
DB_PASSWORD=jsquota_pass
DB_DATABASE=jsquota
APP_PORT=3000
```

## Commands

| Command | Purpose |
|---------|---------|
| `docker compose up` | Start MySQL + app |
| `npm run start:dev` | Dev server (watch mode) |
| `npm run build` | `nest build` |
| `npm run lint` | ESLint with Prettier |
| `npm run test` | Jest unit tests |
| `npm run test:e2e` | E2E tests (requires `test/jest-e2e.json`) |

## Module system

tsconfig uses `module: "nodenext"`, `moduleResolution: "nodenext"`. Decorators enabled.
