# Backend Todo-App -> Nexplore exercise

## Description

This is a repository for the Nexplore Todo Application project
This RESTFul API is built with ExpressJS and uses PostgresSQL for the data persistence.

## Installation

1. Clone this repository in your local PC:

```bash
git clone https://github.com/julamifra/todo-app-front.git
```

2. In the project directory, install dependencies:

```bash
npm install
```

3. Add an .env file in the root level (copy the keys as it is in .env.example):

```bash
PG_HOST=localhost
PG_PORT=5432
PG_USER=user_example
PG_PASSWORD=password_example
PG_DATABASE=todo_app_db
PG_DATABASE_TESTS=todo_app_db_tests

NODE_ENV="development"
```

4. PostgresSQL must be installed in your PC. You can download it from this link: https://www.postgresql.org/download/

5. Open your PostgresSQL database from the client you prefer (PGAdmin, DBeaver... ) and execute the queries provided in '/database/db.sql' from this project.

## Run the app

Run the application in your local:

```bash
npm run dev
```

Prepare the application for production:

```bash
npm run build
```

Lint project:

```bash
npm run lint
```

## Testing

Integration tests have been performed. To run them, a testing database (e.g.: db_todo_app_test) must be created and run the /database/db.sql script in there.

In .env file, set PG_DATABASE_TESTS key with the testing database name.

Run tests

```bash
npm run test
```

## Technologies and libraries used

- ExpressJS to build the RESTFull API in NodeJS
- PostgresSQL to data persistance storage
- Jest and supertest for testing
- CORS for cross-origin resources

- No ORM or libraries have been used to interact with DDBB. Plain queries have been used
