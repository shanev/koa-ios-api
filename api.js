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
// Decrypted user id gets stored in ctx.state.user.id
const auth = koaJWT({ secret: process.env.JWT_SECRET });

/**
 * GET /users/self
 * Get user associated with JWT token.
 */
router.get('/users/self', auth, async (ctx) => {
  ctx.body = await User.findById(ctx.state.user.id);
});

/**
 * PUT /users/self
 * Update user properties.
 */
router.put('/users/self', auth, async (ctx) => {
  const { body } = ctx.request;
  if (Object.keys(body).length === 0) {
    throw new InvalidRequestError();
  }
  ctx.body = await User.findAndUpdate(ctx.state.user.id, body);
});

module.exports = router;
