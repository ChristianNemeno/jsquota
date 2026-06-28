.
├── README.md
├── apps
│   ├── graphql
│   │   ├── src
│   │   │   ├── constants
│   │   │   │   ├── Providers.ts
│   │   │   │   └── index.ts
│   │   │   ├── lambda.ts
│   │   │   ├── main.ts
│   │   │   └── modules
│   │   │       ├── app
│   │   │       │   └── app.module.ts
│   │   │       ├── common
│   │   │       │   └── common.module.ts
│   │   │       └── days-of-week
│   │   │           ├── days-of-week.module.ts
│   │   │           ├── resolver
│   │   │           │   ├── days-of-week.resolver.spec.ts
│   │   │           │   ├── days-of-week.resolver.ts
│   │   │           │   └── index.ts
│   │   │           └── response
│   │   │               ├── days-of-week.response.ts
│   │   │               └── index.ts
│   │   ├── test
│   │   │   ├── app.e2e-spec.ts
│   │   │   ├── jest-e2e.json
│   │   │   └── setup-tests.ts
│   │   └── tsconfig.app.json
│   └── ntv360-api
│       ├── src
│       │   ├── lambda.ts
    │       │   ├── main.ts
│       │   ├── modules
│       │   │   ├── app
│       │   │   │   ├── app.controller.spec.ts
│       │   │   │   ├── app.controller.ts
│       │   │   │   ├── app.module.ts
│       │   │   │   └── app.service.ts
│       │   │   ├── common
│       │   │   │   └── common.module.ts
│       │   │   └── days-of-week
│       │   │       ├── controller
│       │   │       │   ├── days-of-week.controller.spec.ts
│       │   │       │   ├── days-of-week.controller.ts
│       │   │       │   └── index.ts
│       │   │       ├── days-of-week.module.ts
│       │   │       └── swagger
│       │   │           ├── days-of-week.swagger.ts
│       │   │           └── index.ts
│       │   └── swagger.ts
│       ├── test
│       │   ├── app.e2e-spec.ts
│       │   ├── jest-e2e.json
│       │   ├── setup-tests.ts
│       │   └── user.e2e-spec.ts
│       └── tsconfig.app.json
├── config
│   └── ntv360
│       ├── index.ts
│       ├── migrations
│       │   └── 1774419618344-addedDaysOfWeekEntity.ts
│       ├── ntv360.config.ts
│       ├── ntv360.datasource.ts
│       └── seeds
│           ├── days-of-week.seed.ts
│           └── ntv360.seed.ts
├── docs
│   └── README.md
├── env
├── eslint.config.mjs
├── jest.config.cjs
├── libs
│   ├── core
│   │   ├── src
│   │   │   ├── common
│   │   │   │   ├── bootstrap
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── wire-up-app.ts
│   │   │   │   ├── cookies
│   │   │   │   │   └── index.ts
│   │   │   │   ├── decorators
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── sanitize-string.decorator.ts
│   │   │   │   ├── filters
│   │   │   │   │   ├── global-exception.filter.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── guards
│   │   │   │   │   └── index.ts
│   │   │   │   ├── index.ts
│   │   │   │   ├── interceptors
│   │   │   │   │   ├── index.ts
│   │   │   │   │   ├── logging.interceptor.ts
│   │   │   │   │   └── response.interceptor.ts
│   │   │   │   ├── middlewares
│   │   │   │   │   ├── cookie-auth.middleware.ts
│   │   │   │   │   └── index.ts
│   │   │   │   └── responses
│   │   │   │       ├── error-response.ts
│   │   │   │       ├── graphql-paginated-response.ts
│   │   │   │       ├── index.ts
│   │   │   │       └── success-response.ts
│   │   │   ├── constants
│   │   │   │   ├── Cookies.ts
│   │   │   │   ├── DaysOfWeek.ts
│   │   │   │   ├── index.ts
│   │   │   │   └── tokens
│   │   │   │       ├── index.ts
│   │   │   │       └── redis.token.ts
│   │   │   ├── dtos
│   │   │   │   ├── days-of-week
│   │   │   │   │   ├── create-days-of-week.dto.ts
│   │   │   │   │   ├── days-of-week-raw.dto.ts
│   │   │   │   │   ├── days-of-week.dto.ts
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── update-days-of-week.dto.ts
│   │   │   │   ├── index.ts
│   │   │   │   └── shared
│   │   │   │       ├── index.ts
│   │   │   │       ├── pagination-meta.dto.ts
│   │   │   │       └── query-options.dto.ts
│   │   │   ├── entities
│   │   │   │   ├── index.ts
│   │   │   │   └── ntv360
│   │   │   │       ├── days-of-week.entity.ts
│   │   │   │       └── index.ts
│   │   │   ├── index.ts
│   │   │   ├── modules
│   │   │   │   ├── index.ts
│   │   │   │   └── redis
│   │   │   │       ├── index.ts
│   │   │   │       └── redis.module.ts
│   │   │   ├── services
│   │   │   │   ├── days-of-week
│   │   │   │   │   ├── days-of-week.service.spec.ts
│   │   │   │   │   ├── days-of-week.service.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── index.ts
│   │   │   │   └── jwt
│   │   │   │       ├── index.ts
│   │   │   │       ├── jwt.service.spec.ts
│   │   │   │       └── jwt.service.ts
│   │   │   ├── strategies
│   │   │   │   ├── index.ts
│   │   │   │   └── jwt.strategy.ts
│   │   │   └── utils
│   │   │       ├── authentication-cookie-extractor.helper.ts
│   │   │       ├── cookie-extractor.helper.ts
│   │   │       ├── field-mapper.helper.ts
│   │   │       ├── filter-parser.helper.ts
│   │   │       ├── get-claim.helper.ts
│   │   │       ├── index.ts
│   │   │       ├── query-filter-builder.helper.ts
│   │   │       ├── silent-json-parse.helper.ts
│   │   │       └── transform-filter-value.helper.ts
│   │   └── tsconfig.lib.json
│   └── types
│       └── src
│           ├── auth
│           │   ├── app-metadata.ts
│           │   ├── auth-user-types.ts
│           │   ├── auth0-jwt-payload.ts
│           │   ├── error-token-response.ts
│           │   ├── index.ts
│           │   ├── jwt-payload.ts
│           │   ├── jwt-session-payload.ts
│           │   └── token-response.ts
│           ├── common
│           │   ├── index.ts
│           │   └── logging.types.ts
│           └── index.ts
├── nest-cli.json
├── package-lock.json
├── package.json
├── samconfig.toml
├── tools
│   ├── migration-manager.ts
│   ├── scaffold-entity.ts
│   └── templates
│       ├── graphql
│       │   ├── module.template.ts
│       │   ├── resolver.spec.template.ts
│       │   ├── resolver.template.ts
│       │   └── response.template.ts
│       ├── pluralize.ts
│       ├── rest
│       │   ├── controller.spec.template.ts
│       │   ├── controller.template.ts
│       │   ├── module.template.ts
│       │   └── swagger.template.ts
│       ├── shared
│       │   ├── constant.template.ts
│       │   ├── seed.template.ts
│       │   ├── service.spec.template.ts
│       │   └── service.template.ts
│       └── types.ts
├── tsconfig.build.json
├── tsconfig.json
├── webpack.config.js
└── yaml
    ├── serverless.yml
    ├── template-graphql.yml
    ├── template-rest-api.yml
    └── template.yml