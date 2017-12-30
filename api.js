// External modules
const koaJWT = require('koa-jwt');
const Router = require('koa-router');

// Internal modules
const ClientError = require('./lib/client-error');
const User = require('./app/user');

// 400 error
class InvalidRequestError extends ClientError {
  constructor() {
    super();
    this.message = 'Invalid fields sent with request';
  }
}

const router = new Router({
  prefix: '/api/v1',
});

// middleware to validate JWT token
const auth = koaJWT({ secret: process.env.JWT_SECRET });

router.get('/users/self', auth, async (ctx) => {
  const userId = ctx.state.user.id;
  ctx.body = await User.findById(userId);
});

router.put('/users/self', auth, async (ctx) => {
  const userId = ctx.state.user.id;
  const body = ctx.request.body;
  const keys = Object.keys(body);
  if (keys.length === 0) {
    throw new InvalidRequestError();
  }
  await User.findOneAndUpdate({ _id: userId }, body);
  ctx.status = 200;
});

router.post('/users/self/deviceToken', auth, async (ctx) => {
  const userId = ctx.state.user.id;
  const deviceToken = ctx.request.body.deviceToken;
  if (deviceToken == null) {
    throw new InvalidRequestError();
  }
  await User.findOneAndUpdate({ _id: userId }, { deviceToken });
  ctx.status = 200;
});

module.exports = router;
