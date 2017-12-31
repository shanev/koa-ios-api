// External modules
const jwt = require('jsonwebtoken');
const koaJWT = require('koa-jwt');
const Router = require('koa-router');

// Internal modules
const { InvalidRequestError } = require('./lib/error');
const User = require('./app/user');

// Prefix API with version number
const router = new Router({
  prefix: '/api/v1',
});

/**
 * POST /users
 * Create new user.
 * Send back JWT for authentication.
 */
router.post('/users', async (ctx) => {
  const user = new User();
  await user.save();
  ctx.body = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
});

// Middleware: JWT token validation
const auth = koaJWT({ secret: process.env.JWT_SECRET });

/**
 * GET /users/self
 * Get user associated with JWT token.
 */
router.get('/users/self', auth, async (ctx) => {
  const userId = ctx.state.user.id;
  ctx.body = await User.findById(userId);
});

/**
 * PUT /users/self
 * Update user properties.
 */
router.put('/users/self', auth, async (ctx) => {
  const userId = ctx.state.user.id;
  const { body } = ctx.request.body;
  const keys = Object.keys(body);
  if (keys.length === 0) {
    throw new InvalidRequestError();
  }
  await User.findOneAndUpdate({ _id: userId }, body);
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
