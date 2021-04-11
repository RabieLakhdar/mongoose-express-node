# node-express-postgresql

## Table of Contents

- [About](#about)
- [Installation](#installation)
- [Usage](#usage)
---

## About

**node-express-postgresqlL** is a REST API developed with Docker, Node.js, PostgreSQL, and Knex.js.
You can find user table created of migration folder.
```bash
You can find example : 
     -controller 
     -modal
     -route
```

## Installation

1. You'll need [Docker and docker-compose][dc].

```bash
$ git clone https://gitlab.com/maltem-africa-lab/node-express-postgresql.git
```
2. Fill all variables necessary on nodemon.json and docker-compose.yml.

3. Build Docker container locally:

```bash
$ docker-compose up -d --build
```

4. Run migrations & seed(if you have seed content):

```bash
Migrate to create Tables on your PostgreSQL Database:
$ npx knex migrate:latest 

Seed to fill data on tables:
$ npx knex seed:run
```

## Usage
Run your container locally
```bash
docker-compose up -d
```
and then start your server to:

```bash
npx nodemon
```

Go to `http://localhost:5000/api/v1` to see the Express app.

[dc]: https://docs.docker.com/compose/
