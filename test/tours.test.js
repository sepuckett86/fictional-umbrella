require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');

describe('app routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });
  describe('tour routes', () => {
    it('posts a new tour', () => {
      const tour = {
        title: 'Mind Exploration',
        launchDate: Date.now()
      };

      return request(app)
        .post('/api/v1/tours')
        .send(tour)
        .then(res => {
          expect(res.body).toEqual({
            _id: expect.any(String),
            title: 'Mind Exploration',
            launchDate: expect.any(String),
            activities: [],
            stops: [],
            __v: 0
          });
        });
    });
  });
});
