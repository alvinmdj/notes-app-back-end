# Notes App Back-end (Hapi)

## Links

- [Hapi](https://hapi.dev/)
- [ESLint](https://eslint.org/)
- [Joi](https://joi.dev/api/)
- [PostgreSQL](https://www.postgresql.org/)
- [JWT](https://jwt.io/)
- [RabbitMQ](https://www.rabbitmq.com/)
- [Redis](https://redis.io/)
- [Memurai (Redis alt for windows)](https://www.memurai.com/)
- [Redis Package for JavaScript](https://www.npmjs.com/package/redis)
- [Hapi-JWT](https://hapi.dev/module/jwt/)
- [Hapi-Inert](https://hapi.dev/module/inert/api/?v=6.0.5)
- [Caching in Hapi](https://hapi.dev/tutorials/caching/)
- [AWS S3 for Node.js](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#upload-property)
- [AWS-SDK](https://www.npmjs.com/package/aws-sdk)
- [Authentication with Hapi](https://hapi.dev/tutorials/auth/)
- [amqplib](https://www.npmjs.com/package/amqplib)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [node-postgres](https://node-postgres.com/)
- [node-pg-migrate](https://www.npmjs.com/package/node-pg-migrate)
- [PostgreSQL Best Practice](https://wiki.postgresql.org/wiki/Don't_Do_This)
- [PostgreSQL Data Type](https://www.postgresql.org/docs/current/datatype.html)
- [PostgreSQL Constraints](https://www.postgresql.org/docs/current/ddl-constraints.html)
- [PostgreSQL Insert](https://www.postgresql.org/docs/current/sql-insert.html)
- [Postman: writes pre-request scripts](https://learning.postman.com/docs/writing-scripts/script-references/postman-sandbox-api-reference/#sending-requests-from-scripts)
- [MIME Types](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types)
- [Client app v1](http://notesapp-v1.dicodingacademy.com/)
- [Client app v2](http://notesapp-v2.dicodingacademy.com/)
- chrome://flags/#block-insecure-private-network-requests

## Features

- CRUD notes
- Store data in database with PostgreSQL
- Data validation with Joi
- Error handling & custom exceptions
- Token-based authentication with JWT
- Authorization with Bearer Token
- Notes collaboration with database normalization
- Export notes with message broker implementation using RabbitMQ
- Image upload and storage with Amazon S3 (or locally)
- Server-side caching implementation with Redis

## Requirements

- [Node.js v16.13+](https://nodejs.org/en/)
- [NPM v8.1+](https://www.npmjs.com/package/npm)
- [PostgreSQL v13.3+](https://www.postgresql.org/)
- [RabbitMQ v3.9+](https://www.rabbitmq.com/)
- [Postman](https://www.postman.com/) (for testing)
- [notes-app-queue-consumer](https://github.com/alvinmdj/notes-app-queue-consumer) to enable notes export feature

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
ACCESS_TOKEN_AGE=<duration-in-seconds>

# Message broker
RABBITMQ_SERVER=amqp://localhost

# aws-sdk (optional if you want to try Amazon S3, also look at the amazon-s3-implementation branch for the project configuration)
AWS_ACCESS_KEY_ID=<aws-access-key-id>
AWS_SECRET_ACCESS_KEY=<aws-secret-access-key>
AWS_BUCKET_NAME=<aws-bucket-name>

# Redis
REDIS_SERVER=localhost
```

- Run database migration:

```sh
npm run migrate up
```

- Run (development):

```sh
# notes app back-end
npm run start-dev

# note: run the notes-app-queue-consumer to enable notes export feature
# https://github.com/alvinmdj/notes-app-queue-consumer
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
# or refers to the official documentation: https://eslint.org/docs/user-guide/getting-started
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
# -d equals --dbname
psql -U <username> -d <dbname>
<enter password>
# example
psql -U alvin -d notesapp

# show all tables
\dt

# show column names, data types, indexes, constraints, etc. of a table
\d+ <table_name>

# delete table data in database
truncate <table_name_1>, <table_name_2>, <table_name_3>, ...;
# example
truncate notes, users, authentications, collaborations;

# After logged in as root user:

# create user:
CREATE USER <username> WITH ENCRYPTED PASSWORD '<password>';

# create db:
CREATE DATABASE <dbname>;

# grant privileges to other user:
GRANT ALL PRIVILEGES ON DATABASE <dbname> TO <username>;

# quit postgres:
\q
```

- Generate random key with crypto (node REPL):

```sh
# enter node repl
node

# generate random key
require('crypto').randomBytes(64).toString('hex');
```

- RabbitMQ:

```sh
# activate rabbitmq_management plugin (first time only):
# open RabbitMQ Command Prompt (sbin dir) and run the following command:
rabbitmq-plugins.bat enable rabbitmq_management 
# note: this is for Windows OS

# access RabbitMQ management webpage: 
# http://localhost:15672
# login as 'guest' by default (both username & password)
```

- Memurai:

```sh
# access memurai-cli
memurai-cli

# below commands is usable inside memurai-cli

# test memurai (if it returns 'PONG' == success)
ping

# set (create)
# syntax: SET <key> <value> [EX expirationInSecond | PX expirationInMilliseconds]
SET name "alvin"
SET age "18" EX 30 # expired in 30 seconds

# get
# syntax: GET <key>
GET name

# set (update) will override old value from the same key
SET name "martin"

# delete
# syntax: DEL <key> [key2] [key3] ...
DEL name
DEL name age
```
