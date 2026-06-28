---
name: file-structure
description: Scaffold and maintain NestJS monorepo projects following the kahoy project structure
---

## When to use
Use this skill when creating new modules, apps, or libraries in a NestJS monorepo following the kahoy-style structure.

## Project structure

```
├── apps/
│   ├── <app-name>/          # NestJS applications (REST or GraphQL)
│   │   ├── src/
│   │   │   ├── lambda.ts    # Lambda entry point
│   │   │   ├── main.ts      # Local dev entry point
│   │   │   ├── swagger.ts   # Swagger config (REST only)
│   │   │   └── modules/
│   │   │       ├── app/     # Root module
│   │   │       ├── common/  # Shared module for this app
│   │   │       └── <domain>/  # Feature module
│   │   │           ├── <domain>.module.ts
│   │   │           ├── controller/ (REST) or resolver/ (GraphQL)
│   │   │           │   ├── index.ts
│   │   │           │   └── <domain>.controller.ts / <domain>.resolver.ts
│   │   │           └── swagger/ (REST) or response/ (GraphQL)
│   │   │               └── index.ts
│   │   └── test/
│   │       ├── jest-e2e.json
│   │       ├── setup-tests.ts
│   │       └── *.e2e-spec.ts
│   └── ...
├── libs/
│   ├── <lib-name>/          # Shared libraries
│   │   └── src/
│   │       ├── index.ts     # Barrel export
│   │       ├── common/      # Bootstrap, decorators, filters, guards, interceptors, middlewares, responses
│   │       ├── constants/   # Enums, token symbols
│   │       ├── dtos/        # DTOs organized by domain
│   │       │   ├── index.ts
│   │       │   ├── <domain>/
│   │       │   └── shared/
│   │       ├── entities/    # TypeORM entities organized by datasource
│   │       ├── modules/     # Feature modules (e.g. redis)
│   │       ├── services/    # Services organized by domain
│   │       ├── strategies/  # Passport strategies
│   │       └── utils/       # Helper functions
│   └── ...
├── config/
│   └── <project>/
│       ├── index.ts
│       ├── <project>.config.ts
│       ├── <project>.datasource.ts
│       ├── migrations/
│       └── seeds/
│           ├── <project>.seed.ts
│           └── <entity>.seed.ts
├── tools/
│   ├── scaffold-entity.ts   # Entity scaffolding script
│   ├── migration-manager.ts
│   └── templates/           # Code generation templates
│       ├── graphql/         # module, resolver, resolver.spec, response
│       ├── rest/            # module, controller, controller.spec, swagger
│       └── shared/          # constant, seed, service, service.spec
├── yaml/                    # SAM / Serverless deployment configs
├── env/                     # Environment files
├── docs/
├── nest-cli.json
├── webpack.config.js
└── samconfig.toml
```

## Module conventions

### REST module structure
```
modules/<domain>/
├── <domain>.module.ts
├── controller/
│   ├── index.ts
│   ├── <domain>.controller.ts
│   └── <domain>.controller.spec.ts
└── swagger/
    ├── index.ts
    └── <domain>.swagger.ts
```

### GraphQL module structure
```
modules/<domain>/
├── <domain>.module.ts
├── resolver/
│   ├── index.ts
│   ├── <domain>.resolver.ts
│   └── <domain>.resolver.spec.ts
└── response/
    ├── index.ts
    └── <domain>.response.ts
```

## Key conventions
- Each domain folder has an `index.ts` barrel export
- Lib `index.ts` re-exports all public API surface
- DTOs live in `libs/<lib>/src/dtos/<domain>/`
- Entities live in `libs/<lib>/src/entities/<datasource>/`
- Config and datasource are separate from the app modules
- Apps have both `main.ts` (local dev) and `lambda.ts` (serverless entry)
- Every module is self-contained with its own folder and barrel exports
- Tools use templates for code generation rather than manual scaffolding
