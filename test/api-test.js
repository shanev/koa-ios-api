const app = require('../app.js');
const jwt = require('jsonwebtoken');
const request = require('supertest').agent(app.listen());
const User = require('../app/user');

describe('API', () => {
  describe('/api/v1/users', () => {
    describe('POST', () => {
      it('should create a new user', (done) => {
        request
          .post('/api/v1/users')
          .expect('Content-Length', '148')
          .expect(200, done);
      });
    });
  });

  describe('/api/v1/users/self', () => {
    describe('GET', () => {
      it('should get a user', (done) => {
        User.find({})
          .then((users) => {
            const token = jwt.sign({ id: users[0].id }, process.env.JWT_SECRET);
            request
              .get('/api/v1/users/self')
              .set('Authorization', `Bearer ${token}`)
              .expect(200, done);
          });
      });
    });

    describe('PUT', () => {
      it('should update device token', (done) => {
        User.find({})
          .then((users) => {
            const token = jwt.sign({ id: users[0].id }, process.env.JWT_SECRET);
            const data = { device: { token: 'ad9s8f7a9ds8f7ads98f7' } };
            request
              .put('/api/v1/users/self')
              .set('Authorization', `Bearer ${token}`)
              .send(data)
              .expect(200, /ad9s8f7a9ds8f7ads98f7/, done);
          });
      });
    });
  });
});
