const apn = require('apn');
const util = require('util');

const options = {
  token: {
    key: process.env.APN_AUTH_KEYPATH,
    keyId: process.env.APN_KEY_ID,
    teamId: process.env.APN_TEAM_ID,
  },
};

const service = new apn.Provider(options);

class APN {
  static async send(user, message, payload = null) {
    const note = new apn.Notification();
    note.alert = message;
    note.payload = payload;
    note.topic = 'koa-ios-api';

    if (user.device) {
      const response = await service.send(note, user.device.token);
      response.sent.forEach(() => {
        console.log(`Push sent to: ${user.id}`);
      });
      response.failed.forEach((failure) => {
        if (failure.error) {
          console.error(`Network error: ${failure.device}, ${failure.error}`);
        } else {
          console.error(`Push error for ${user.id}: ${failure.status}, ${util.inspect(failure.response)}`);
        }
      });
    } else {
      console.log(`No device token for ${user.id}.`);
    }
  }
}

module.exports = APN;
