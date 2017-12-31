require('dotenv').config();
require('./lib/mongoose');

const api = require('./api.js');
const bodyParser = require('koa-bodyparser');
const Koa = require('koa');

const app = new Koa();

app.use(bodyParser());

async function debugMiddleware(ctx, next) {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
}

if (process.env === 'development') {
  app.use(debugMiddleware);
}

// API
app.use(api.routes());

// start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Koa server started on port ${port}`);
});

module.exports = app;
