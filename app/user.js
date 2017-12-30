const mongoose = require('../lib/mongoose');

const UserSchema = new mongoose.Schema({
  deviceToken: { type: String, trim: true },
}, { timestamps: true });

// Pre hook for `findOneAndUpdate`
UserSchema.pre('findOneAndUpdate', function preUpdate(next) {
  this.options.runValidators = true;
  next();
});

module.exports = mongoose.model('User', UserSchema);
