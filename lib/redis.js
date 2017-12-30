require('dotenv').config();

const redis = require('redis').createClient(process.env.REDIS_URL);

console.log('Configuring Redis...');

redis.client('SETNAME', 'koa-ios-api');

module.exports = redis;
