# Authors Model — Implementation Audit

Date: 2026-06-28 | Updated: 2026-06-28 (after v002 entities)

## Files examined

| Layer | Path | Status |
|---|---|---|
| Entity | `libs/core/src/entities/authors/author.entity.ts` | Done |
| Create DTO | `libs/core/src/dtos/authors/create-author.dto.ts` | Done (minor issues) |
| Update DTO | `libs/core/src/dtos/authors/update-author.dto.ts` | Done |
| Service | `libs/core/src/services/authors/authors.services.ts` | Done |
| REST Controller | `apps/rest/src/modules/authors/controller/authors.controller.ts` | Scaffolded |
| REST Module | `apps/rest/src/modules/authors/authors.module.ts` | **BUGGY** |
| Swagger DTO | `apps/rest/src/modules/authors/swagger/authors.swagger.ts` | Done, unused |
| GraphQL Resolver | `apps/graphql/` | **Not started** |
| Migrations | `config/jsquota/migrations/` | **None exist** |
| Tests | `*.spec.ts` (anywhere) | **None exist** |
| Change record | `zdocs/records/` | v002 written |

---

## CRITICAL (app won't run)

### 1. ~~AuthorsModule imports itself~~ ✅ FIXED

### 2. ~~AuthorsModule not imported in AppModule~~ ✅ FIXED

---

## HIGH

### 3. GET /authors/:id/quotes returns Author, not quotes

The endpoint calls `this._authorsService.findOne(id)` and returns the `Author` entity. The spec requires returning the author's quotes. No `findQuotesByAuthor()` method exists on the service.

### 4. ~~No @OneToMany relationship on Author entity~~ ✅ FIXED
All 4 entities (Author, Quote, Category, Tag) now exist with full relationships.

### 5. Route-ordering risk

`GET :id` is registered before `GET :id/quotes`. NestJS may shadow the quotes endpoint depending on registration order.

### 6. No tests

Zero unit or e2e tests exist for the authors feature (or any feature).

### 7. No migration files

`synchronize: true` is used in dev, but no migration files exist. The spec requires schema changes to be handled through migrations.

---

## MEDIUM

### 8. GraphQL app is empty

`apps/graphql/src/main.ts`, modules, and resolvers are all empty stubs. No author resolver exists.

### 9. No Swagger decorators on controller endpoints

Controller methods lack `@ApiTags`, `@ApiOperation`, `@ApiResponse`. The `AuthorResponse` Swagger DTO exists but is unused.

### 10. Swagger bootstrap file is empty

`apps/rest/src/swagger.ts` has no content — Swagger UI not wired.

---

## LOW (code quality)

| Issue | File |
|---|---|
| Unused `IsAlpha` import | `create-author.dto.ts:1` |
| `bio` has `@IsOptional()` but no `@IsString()` | `create-author.dto.ts:11` |
| `UpdateAuthorDto` imports `@nestjs/swagger` in shared `libs/core` | `update-author.dto.ts:1` |
| JSDoc placeholder "It is what is it" on `remove()` | `authors.services.ts:53-55` |
| `zdocs.md` lists `id` as `string` but entity uses `number` | `zdocs.md:10` |
| No author change record in `zdocs/records/` | — |
