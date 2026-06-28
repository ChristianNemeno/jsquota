# v002 — All Entities with Relationships

Created all 4 entities with TypeORM relationship decorators:

| Entity | File | Relations |
|--------|------|-----------|
| Author | `libs/core/src/entities/authors/` | `@OneToMany` → Quote |
| Quote | `libs/core/src/entities/quotes/` | `@ManyToOne` → Author, Category; `@ManyToMany` → Tag (owns join table) |
| Category | `libs/core/src/entities/categories/` | `@OneToMany` → Quote |
| Tag | `libs/core/src/entities/tags/` | `@ManyToMany` → Quote |

Also fixed `app.module.ts`: removed orphaned `AppController`/`AppService` references, cleaned `ConfigModule.forFeature()` config, moved `AuthorsModule` to top-level imports.
