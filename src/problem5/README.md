# Code Challenge Application

# Features

## CRUD application

|            Feature             | Method |     Path      |
| :----------------------------: | :----: | :-----------: |
|           Get books            |  GET   |   /v1/books   |
|         Get book by ID         |  GET   | /v1/books/:id |
|          Create book           |  POST  |   /v1/books   |
| Update book (partially update) | PATCH  | /v1/books/:id |
|   Delete book (soft delete)    | DELETE | /v1/books/:id |
|      Restore deleted book      | PATCH  | /v1/books/:id |

## API Rate limiting

[Rate limiting middleware](./src/middlewares/app.middlewares.ts)

> Currently I am setting API Rate limiting to limit 20 api/min

## Linting & Code formatter

> With linting & prettier setup, ensuring the code is matching the standard

## Database migration

> Using prisma as an ORM and migration tool for ease of setting up

## Graceful shutdown

[Graceful shutdown](./src/index.ts)

> Graceful shutdown has been setup to free resources before the application is terminated

## Universal Error handling

- [Error handling middleware](./src/middlewares/error-handler.middleware.ts)
- [Catch async exception](./src/utils/catchAsync.ts)

> The application is design to capture all errors throw by internal logic or 3rd party services (prisma,joi,...) using error handling middleware and async error catching wrapper function

## Schema Validation

> With the use of Joi, schema sent to server will all be validated to ensure there is no cyber security issue or bad request received and processed

- [Validator Schemas](./src/validators/index.ts)
- [Validator Middleware](./src/middlewares/validator.middleware.ts)

## OpenAPI

> For the ease of testing, OpenAPI is added with Swagger tool for easier support. With the use of swagger-js-doc & swagger-ui-express. The docs is served on /docs

# Prerequisite

> I have developed the application that can be run in 2 different ways. Depends on how we want to run, prerequsite will be vary

## Using NodeJS locally

- Local Postgres database setup
- NodeJS with version `20.17` or NVM installed
- Yarn package manager installed

## Using Docker

- Docker installed
- Docker compose installed

# How to run application

## Method 1 - Running locally using NodeJS

1. Install dependencies

```
yarn install
```

2. Copy `env.example` to `.env` and [ajust database connection](#techniques)

```sh
cp .env.example .env
```

`.env`

```sh
POSTGRES_USER=postgres # Postgres username
POSTGRES_PASSWORD=postgres # Postgres password
POSTGRES_DB=postgres # Postgres database name
POSTGRES_HOST=localhost # Postgres host
POSTGRES_PORT=5432 # Postgres port
```

3. Perform database migration

```
yarn migrate:latest
```

4. Start application

```
yarn start:dev # Dev mode
yarn build && yarn start # Production mode
```

## Running using Docker & Docker compose

1. Copy `.env.example` to `.env.dev` and ajust database connection. Mind that the `POSTGRES_HOST` and `POSTGRES_PORT` should remains & match the docker compose config

```sh
cp .env.example .env.dev
```

`.env.dev`

```sh
POSTGRES_USER=postgres # Postgres username
POSTGRES_PASSWORD=postgres # Postgres password
POSTGRES_DB=postgres # Postgres database name
POSTGRES_HOST=postgres # Postgres host
POSTGRES_PORT=5432 # Postgres port
```

3. Start the docker stack

```
docker compose --env-file .env.dev -f docker-compose.yaml up postgres
docker compose --env-file .env.dev -f docker-compose.yaml up backend --build
```

# How to test the application

## Using Curl

## Using Swagger of OpenAPI

- For ease of testing, I have added the support for Swagger OpenAPI. You can check the swagger doc served at `http://localhost:3000/docs` for testing & playing with the application

# Techniques

## Validation

> Validation is used by a utilizing a tool Joi with custom validation middleware to ensure all inputs are validated

Steps to follow input validation

1. [Define schema](./src/validators/index.ts)
2. [Create validation middleware for a route](./src/routers/v1/book.router.ts)

## Migration

> I used prisma as an orm and migration tool at the same time due to ease of setup and fast starting point. In further, we should aim to an isolated migration solution that will decouple the backend application code with migration script. We can leverage this tool for migration https://github.com/golang-migrate/migrate or using kubernetes that has a migration job running separated

```
yarn migrate:generate [name] # Generate migration script (offline mode)
yarn migrate:latest # Migrate to latest version
yarn migrate [version] # Migrate to a specific version
```

## Linting

> This setup already included with prettier & eslint setup for code formatting. When working with this project, prettier plugin should be installed and set as default formatter

```
yarn lint # Linting
yarn lint:fix # Fix linting issue
```

## Local Database

> We can also spin up local database using docker without to boot the containerize backend app

```
docker compose --env-file .env -f docker-compose.yaml up postgres
```

## Improvement

> Improvements are techniques that can be made in order to improve the application but unable to do due to time limitation

- Logging & Tracing (ELK)
- Monitoring (Prometheus, Grafana)
- Kubernetes deployment & Horizontal scaling
- CI/CD pipeline
- Request caching
