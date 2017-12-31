# Koa iOS API

Koa backend API server boilerplate for iOS apps using ES2017 Javascript and best practices.

Stack:

* MongoDB
* Redis

Features:

* Authentication using JSON Web Tokens
* Push notifications using [node-apn](https://github.com/node-apn/node-apn)
* User model and API for saving device tokens

**_NOTE: This project is being extracted from a few others and is not currently production ready._**

## Install

`git clone https://github.com/shanev/koa-ios-api && cd koa-ios-api`

`npm install`

Create a .env file with environment variables specific to your app:

```
APN_AUTH_KEYPATH=xxx
APN_KEY_ID=xxx
APN_TEAM_ID=xxx
JWT_SECRET=secret
MONGO_URL=mongodb://localhost/your-app-db
MONGOOSE_DEBUG=false
REDIS_URL=redis://localhost:6379
```

## Run

Start MongoDB:

`npm run mongo`

Start Redis (optional):

`npm run redis`

Start Koa:

`npm start`

## Tests

`npm test`
