# BTTF API

REST API for the Back to the Future DVD Store.

## Technology

- Node.js
- Express.js
- TypeScript
- Sequelize
- PostgreSQL
- Jest
- JWT
- AWS S3

## Architecture

The API follows **Clean Architecture** and **Domain-Driven Design (DDD)** principles.

```text
src/
├── application/       # Use cases
├── core/              # Shared domain logic
├── domain/            # Entities mappers and repository interfaces
├── infra/             # Database, aws, express and repository implementations
├── presentation/      # Controllers, http and middlewares
└── shared/            # Shared services
```

Business rules, including the BTTF pricing logic, are kept independent from Express and Sequelize.

## Configuration

Create the environment file:

```bash
cp .env.example .env
```

Then configure PostgreSQL, JWT and AWS S3 variables.

## Installation

```bash
npm install
```

Run database migrations:

```bash
npm run migrate
```

Run seeders:

```bash
npm run seed
```

Start the API:

```bash
npm run dev
```

The API runs on:

```text
http://localhost:4000
```

## Tests

```bash
npm test
```

The pricing tests cover the business cases defined in the exercise.

## Other commands

```bash
npm run build
npm run lint
npm run format:check
```
