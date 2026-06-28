# v001 — Setup TypeORM + ConfigModule

## What changed

### `src/app.module.ts`
- Added `ConfigModule.forRoot({ isGlobal: true })` — loads `.env` and makes `ConfigService` available app-wide
- Added `TypeOrmModule.forRootAsync()` — reads `DB_HOST`, `DB_PORT`, `DB_USERNAME`, `DB_PASSWORD`, `DB_DATABASE` from env via `ConfigService`
- Set `autoLoadEntities: true` and `synchronize: true` (dev mode)

### `src/main.ts`
- Changed port binding from hardcoded `3000` to `process.env.APP_PORT ?? 3000`

### `src/data-source.ts` (new)
- TypeORM CLI data source for running migrations outside NestJS
- Loads `.env` via `dotenv`
- Reads same DB env vars
- Points entities to `dist/**/*.entity.js` and migrations to `dist/migrations/*.js`
- `synchronize: false` (migrations-only mode)

## Why

- Required by zzplan.md: "NestJS project should be connected to MySQL" and "Use TypeORM or Prisma"
- `ConfigModule` centralises env management and is a prerequisite for all feature modules
- `data-source.ts` enables `npx typeorm migration:generate/run` for the code-first migration workflow
