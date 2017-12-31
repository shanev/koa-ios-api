// External modules
const jwt = require('jsonwebtoken');
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

// get user
router.get('/users/self', auth, async (ctx) => {
  const userId = ctx.state.user.id;
  ctx.body = await User.findById(userId);
});

// update user field
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

/**
 * POST /users
 * Create new user.
 */
router.post('/users', async (ctx) => {
  const user = new User();
  await user.save();
  ctx.status = 200;
});

/**
 * POST /users/1/devices
 * Body Parameters: device
 * Save a user's device token.
 */
router.post('/users/self/devices', auth, async (ctx) => {
  const userId = ctx.state.user.id;
  const device = ctx.request.body.device;
  if (device == null) {
    throw new InvalidRequestError();
  }
  await User.findOneAndUpdate({ _id: userId }, { device });
  ctx.status = 200;
});

module.exports = router;
