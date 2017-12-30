require('dotenv').config();

const redis = require('redis').createClient(process.env.REDIS_URL);

console.log('Creating Redis client...');

redis.client('SETNAME', 'koa-ios-api');

module.exports = redis;
