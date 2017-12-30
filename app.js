require('dotenv').config();

const api = require('api.js');
const bodyParser = require('koa-bodyparser');
const Koa = require('koa');
const mongoose = require('./lib/mongoose');

// configure and setup Mongoose
require('./lib/mongoose');

const app = new Koa();

app.use(bodyParser());

// middleware to output HTTP method and time
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  debug(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// API
app.use(api.routes());

// start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  debug(`Koa server started on port ${port}`);
});

module.exports = app;
