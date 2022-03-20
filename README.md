# Notes App Back-end (Hapi)

## Links

- [Hapi](https://hapi.dev/)
- [Joi](https://joi.dev/api/)
- [Node-Postgres](https://node-postgres.com/)
- [Node-Pg-Migrate](https://www.npmjs.com/package/node-pg-migrate)
- [PostgreSQL Best Practice](https://wiki.postgresql.org/wiki/Don't_Do_This)
- [PostgreSQL Data Type](https://www.postgresql.org/docs/current/datatype.html)
- [PostgreSQL Constraints](https://www.postgresql.org/docs/current/ddl-constraints.html)
- [PostgreSQL Insert](https://www.postgresql.org/docs/current/sql-insert.html)
- [Client app v1](http://notesapp-v1.dicodingacademy.com/)
- [Client app v2](http://notesapp-v2.dicodingacademy.com/)
- chrome://flags/#block-insecure-private-network-requests

## Features

- CRUD notes
- Store data in database
- Data validation
- Error handling
- Custom exceptions

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
npm run start
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
