# Koa iOS API

Koa backend API server boilerplate for iOS apps using ES2017 Javascript and best practices.

Stack:

* MongoDB
* Redis

Features:

* Authentication using JSON Web Tokens
* Push notifications using [node-apn](https://github.com/node-apn/node-apn)
* User model and API for saving device tokens

## Install

`npm install koa-ios-api`

Create a .env file with environment variables specific to your app:

```
MONGO_URL=mongodb://localhost/your-app-db
MONGOOSE_DEBUG=false
JWT_SECRET=secret
REDIS_URL=redis://localhost:6379
```

## Run

Start MongoDB:

`npm run mongo`

Start Redis (optional):

`npm run redis`

Start Koa:

`npm start`


