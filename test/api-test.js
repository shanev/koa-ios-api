const app = require('../app.js');
const jwt = require('jsonwebtoken');
const request = require('supertest').agent(app.listen());

describe('API', () => {
  describe('/api/v1/users', () => {
    describe('POST', () => {
      it('should create a user', (done) => {
        request
          .post('/api/v1/users')
          .expect('Content-Length', '148')
          .expect(200, done);
      });
    });
  });

  describe('/api/v1/users/self/devices', () => {
    const token = jwt.sign({ id: '58de92c8d9ef7f4d0e11b9bc' }, process.env.JWT_SECRET);

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
