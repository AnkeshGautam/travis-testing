# Audit Trail Service
[![Quality Gate](https://sonarcloud.io/api/badges/gate?key=AnkeshGautam_travis-testing)](https://sonarcloud.io/dashboard/index/AnkeshGautam_travis-testing)
## Table of Contents

1. [Dependencies](#dependencies)
  1. [System Dependencies](#system-dependencies)
  2. [Node Dependencies](#node-dependencies)
2. [File Structure](#file-structure)
3. [Getting Started](#getting-started)
  1. [Install system dependencies](#install-system-dependencies)
  2. [Install the app](#install-the-app)
  3. [Run the app](#run-the-app)
  4. [Update the app](#update-the-app)
  5. [Uninstall the app](#uninstall-the-app)
4. [TypeScript](#typescript)
7. [API Routes](#routes)
8. [Testing](#testing)
9. [SQL Scripts](#sql-scripts)

## Dependencies <a id="dependencies"></a>

### System Dependencies <a id="system-dependencies"></a>

- [Node.js](https://nodejs.org/en/)
- [NPM](https://www.npmjs.com/)
- [TypeScript](http://www.typescriptlang.org/)

### Node Dependencies <a id="node-dependencies"></a>

#### Dependencies

- [body-parser](): Node.JS body parsing middleware
- [pg-promise](https://www.npmjs.com/package/pg-promise): PostgreSQL interface for Node.js.
- [aws-sdk](https://www.npmjs.com/package/aws-sdk): The official AWS SDK for JavaScript, available for browsers and mobile devices, or Node.js backends.

#### DEV-Dependencies
-[liquibase](https://www.npmjs.com/package/liquibase): library for tracking, managing and applying database schema changes.
- [mocha](https://mochajs.org/): Mocha is a feature-rich JavaScript test framework running on Node.js and in the browser.
- [chai](https://chaijs.com/): Chai is a BDD / TDD assertion library for [node](http://nodejs.org) and the browser that can be delightfully paired with any javascript testing framework.
- [ts-node](https://github.com/TypeStrong/ts-node): TypeScript execution environment and REPL for node.
- [eslint](https://www.npmjs.com/package/eslint): ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.
- [typescript](http://www.typescriptlang.org/): TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.
- [nyc](https://www.npmjs.com/package/nyc): source mapped coverage of Babel and TypeScript projects.
-[sinon](https://www.npmjs.com/package/sinon): Standalone and test framework agnostic JavaScript test spies, stubs and mocks.

## File Structure <a id="file-structure"></a>

We use the component approach in our starter. A component is basically a self contained app usually in a single file or a folder with each concern as a file. Here's how it looks:

```
Platform-service-audit-trail
|
|── src
|   ├── config
|   │   └── config.ts
|   ├── controller
|   │   └── searchController.ts
|   |   └── SearchController.spec.ts
|   |── dao
|   |   └── SearchDAO.ts
|   |   └── SearchDAO.spec.ts
|   │── model
|   |   └──── interface
|   |          └── Response.t
|   |── mockdata
|   |   └──── mockdata.ts
|   |── routes
|   |   └──── SearchRouter.ts
|   |── util
|   |   └──── APIResponse.ts
|   └── app.ts
|   │
|   └── dbConfig.ts
|   |
|   └── server.ts
|
|── sql
|   └── config
|   |     └── config.js
|   └── scripts
|   |     └── table.sql 
|   └── utils
|   |     └── get-secret.js
|   |
|   └── index.liquibase.js
|
└── .eslintrc.json
└── .gitignore
└── .travis.yml
└── ApplicationManifest.json
└── CODEOWNER
└── Dockerfile
└── package-lock.json
└── package.json
└── README.md
└── sonar-project.properties
└── tsconfig.json

```

## Getting Started <a id="getting-started"></a>

### Install system dependencies <a id="install-system-dependencies"></a>

Your system will need access to the `npm` command, so ensure you have the following requirements installed globally;

- [Node.js](https://nodejs.org/en/)
- [NPM](https://www.npmjs.com/)

Once you have Node/npm installed, you should install these globals with `npm install --global`:

- `typescript` (`npm install -g typescript`)

### Install the app <a id="install-the-app"></a>

> Run `npm install` to install all dependencies.

Below is an itemized summary of commands that get executed during installation.

```bash
# Install Node/NPM dependencies
npm install
# ...
```

### Run the app <a id="run-the-app"></a>

> Run `npm run build` to build the application.
> Run `npm run start` to start the application.

Run build scripts and start the application. You can examine these commands within the `scripts` property of the `package.json` file.

Below is an itemized summary of the commands that get executed during the `build & start` script.

```bash
# Run TypeScript compiler
tsc
# Run the app with node
node dist/src/server.js
```

### Update the app <a id="update-the-app"></a>

> Run `npm run update` to update all dependencies.

Below is an itemized summary of commands that get executed during update.

```bash
# Clear the npm cache folder
npm cache clean
# Update Node/NPM dependencies
npm update
# ...
```

### Uninstall the app <a id="uninstall-the-app"></a>

> Run `npm uninstall` to uninstall all dependencies and remove generated files.

Below is an itemized summary of commands that get executed during uninstall.

```bash
# Uninstall Node/NPM dependencies
npm uninstall
# Clean generated directories/files
rm -rf node_modules dist
```

## TypeScript <a id="typescript"></a>

> To take full advantage of TypeScript with autocomplete you would have to install it globally and use an editor with the correct TypeScript plugins.

### Use latest TypeScript compiler
TypeScript 1.7.x includes everything you need. Make sure to upgrade, even if you installed TypeScript previously.

```
npm install -g typescript
```

### Use a TypeScript-aware editor

Developers have good experience using these editors:

* [Visual Studio Code](https://code.visualstudio.com/)
* [Webstorm 10](https://www.jetbrains.com/webstorm/download/)
* [Atom](https://atom.io/) with [TypeScript plugin](https://atom.io/packages/atom-typescript)
* [Sublime Text](http://www.sublimetext.com/3) with [Typescript-Sublime-Plugin](https://github.com/Microsoft/Typescript-Sublime-plugin#installation)

# API Routes <a id="routes"></a> 
Audit Trail API

## /audit
Audit Trail API URL start with audit

### /audit/health
* **GET**: Check the health of the apllication

### /audit/distincts/:columnName
* **GET**: Get the distincts value of the coloumn

### /audit/search
* **GET**: Search audited data by passing query params as entityId ,entityType, userId etc.

# TESTING <a id="testing"></a>

Command to set the environment

    export NODE_ENV=test

Command to execute the testcases

    npm run test

Command to execute testcases with report coverage

    npm run coverage

# SQL Scripts <a id="sql-scripts"></a>
  * Liquibase for change management in DB
    * Scripts
      * dev: `npm run liquibase:dev`
      * uat: `npm run liquibase:uat`
      * prod: `npm run liquibase:prod`
