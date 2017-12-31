const app = require('../app.js');
const jwt = require('jsonwebtoken');
const request = require('supertest').agent(app.listen());

describe('API', () => {
  let token = null;

  describe('Users', () => {
    const userIds = ['58de92c8d9ef7f4d0e11b9bc', '58de92c8d9ef7f4d0e11b9bd', '58de92c8d9ef7f4d0e11b9be'];

    before(async () => {
      // authenticate and grab token
      token = jwt.sign({ id: userIds[0] }, process.env.JWT_SECRET);
    });

    describe('/api/v1/users/self/devices', () => {
      describe('POST', () => {
        it('should save device token', (done) => {
          const data = { device: { token: 'ad9s8f7a9ds8f7ads98f7' } };
          request
            .post('/api/v1/users/self/devices')
            .set('Authorization', `Bearer ${token}`)
            .send(data)
            .expect(200, done);
        });
      });
    });
  });
});
