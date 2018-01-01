const mongoose = require('../lib/mongoose');

const UserSchema = new mongoose.Schema({
  device: {
    token: {
      type: String,
      trim: true,
    },
  },
});

UserSchema.statics.findAndUpdate = function findAndUpdate(userId, body) {
  return this.findOneAndUpdate({ _id: userId }, body, { new: true });
};

module.exports = mongoose.model('User', UserSchema);
