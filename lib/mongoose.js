require('dotenv').config();

const mongoose = require('mongoose');

console.log('Configuring Mongoose...');

// MongoDB setup
mongoose.Promise = global.Promise;

const options = {
  useMongoClient: true,
  keepAlive: 300000,
  connectTimeoutMS: 30000,
};

mongoose.connect(process.env.MONGO_URL, options);

mongoose.connection.on('error', (err) => {
  throw new Error(`Unable to connect to database MongoDB: ${err}`);
});

mongoose.set('debug', process.env.MONGO_DEBUG);

module.exports = mongoose;
