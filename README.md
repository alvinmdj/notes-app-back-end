# Notes App Back-end (Hapi)

Web service deployed on Amazon EC2 (PM2 process manager).

## Links

- [Client app](http://notesapp-v1.dicodingacademy.com/)
- [Dicoding Discussion: spread operator in update note handler](https://www.dicoding.com/academies/261/discussions/115597)
- chrome://flags/#block-insecure-private-network-requests

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

## Dependencies

- Hapi

```sh
npm install @hapi/hapi
```

- nanoid

```sh
npm install nanoid
```

## Dev Dependencies

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
