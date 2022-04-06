# Task

The repository stores solution for Insured Mine Assignment

- `server` - Backend made with NodeJS + Express + MongoDB + Mongoose

## Starting the development environment

1. Install [Docker](https://www.docker.com/get-started) on your system.
2. Run `docker-compose up --build` from the terminal
3. Go to `www.localhost:8000` for accesing the backend

## Running tests

### Backend tests

```shell
docker-compose run server /bin/sh -c "npm run test:unit"

```

## Coding Standards

> REQUIRED:
> prettier and eslint to be activated in the EDITOR of your choice

# To Upload the CSV File

- POST localhost:8000/api/users/upload
- Make sure to pass the csv file as form-data
- key : csv , value : data-sheet.csv

## Other Routes

- Create User
  - /api/users
- Account
  - api/accounts
- Policy
  - api/policies
- Carrier
  - api/carriers
- LOB
  - api/lobs
- Agent
  - api/agents
