# Notes App Back-end (Hapi)

## Links

- [Hapi](https://hapi.dev/)
- [Joi](https://joi.dev/api/)
- [JWT](https://jwt.io/)
- [Hapi-JWT](https://hapi.dev/module/jwt/)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)
- [Node-Postgres](https://node-postgres.com/)
- [Node-Pg-Migrate](https://www.npmjs.com/package/node-pg-migrate)
- [PostgreSQL Best Practice](https://wiki.postgresql.org/wiki/Don't_Do_This)
- [PostgreSQL Data Type](https://www.postgresql.org/docs/current/datatype.html)
- [PostgreSQL Constraints](https://www.postgresql.org/docs/current/ddl-constraints.html)
- [PostgreSQL Insert](https://www.postgresql.org/docs/current/sql-insert.html)
- [Postman: writes pre-request scripts](https://learning.postman.com/docs/writing-scripts/script-references/postman-sandbox-api-reference/#sending-requests-from-scripts)
- [Client app v1](http://notesapp-v1.dicodingacademy.com/)
- [Client app v2](http://notesapp-v2.dicodingacademy.com/)
- chrome://flags/#block-insecure-private-network-requests

## Features

- CRUD notes
- Store data in database with PostgreSQL
- Data validation with Joi
- Error handling
- Custom exceptions
- Token-based authentication with JWT
- Authorization with Bearer Token
- Notes collaboration with database normalization
- Message broker implementation with RabbitMQ
- Image upload with Amazon S3
- Server-side caching implementation with Redis

## Requirements

- Node.js v16.13.2+
- NPM v8.1.2+
- PostgreSQL v13.3+
- Postman (for testing)

## Installation

- Clone this repository:

```sh
git clone https://github.com/alvinmdj/notes-app-back-end.git
```

- Go to the root directory:

```sh
cd notes-app-back-end
```

- Install dependencies:

```sh
npm install
```

- Copy ```.env.example``` and paste as ```.env```:

```sh
cp .env.example .env
```

- Create database and setup environment variables in ```.env```:

```sh
# server configs
HOST=localhost
PORT=5000

# node-postgres configs
PGUSER=<username>
PGPASSWORD=<password>
PGDATABASE=<dbname>
PGHOST=localhost
PGPORT=5432

# JWT token
ACCESS_TOKEN_KEY=<secure-random-key>
REFRESH_TOKEN_KEY=<another-secure-random-key>
```

- Run database migration:

```sh
npm run migrate up
```

- Run (development):

```sh
# with nodemon
npm run start-dev
```

- Run lint:

```sh
# ESLint
npm run lint
```

## Testing with Postman

- Make sure the server is running: ```npm run start-dev```.

- Open Postman and import:
  - ```Notes API Test.postman_collection.json file```
  - ```Notes API Test.postman_environment.json file```

  **Note:** both files are available inside the ```postman``` folder.

- In Postman:
  - Set environment to ```Notes API Test collection```.
  - Click ```Open Music API Test collection``` > ```Run collection``` > ```Run Notes API Test```.

## Personal Notes

- node-pg-migrate:

```sh
# command available after setup migrate script in package.json
npm run migrate ...

# create new migration file
migrate create '<migration name>'

# execute all unrun up migration
migrate up

# execute one down migration from current state
migrate down

# execute previous migration
# this will run a down migration followed with an up migration
migrate redo
```

- Nodemon:

```sh
npm install nodemon --save-dev

# Setup in package.json: "start": "nodemon ./src/server.js"
npm run start-dev
```

- ESLint:

```sh
npm install eslint --save-dev

# Configure eslint
npx eslint --init

# Setup in package.json: "lint": "eslint ./src"
npm run lint

# https://www.dicoding.com/academies/261/tutorials/14757?from=14752
```

- PostgreSQL:

```sh
# Check version:
psql --version
postgres -V

# login as root user:
# -U equals --username
psql -U postgres
<enter password>

# login as non-root user with the db:
psql --username <username> --dbname <db-name>
<enter password>
# example
psql -U alvin --dbname notesapp

# delete table data in database
truncate <table-name-1>, <table-name-2>, <table-name-3>, ...;
# example
truncate notes, users, authentications;

# After logged in as root user:

# create user:
CREATE USER <user-name> WITH ENCRYPTED PASSWORD '<password>';

# create db:
CREATE DATABASE <db-name>;

# grant privileges to other user:
GRANT ALL PRIVILEGES ON DATABASE <db-name> TO <user-name>;
```

- Generate random key with crypto (node REPL):

```sh
# enter node repl
node

# generate random key
require('crypto').randomBytes(64).toString('hex');
```
