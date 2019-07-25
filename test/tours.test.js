require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');

const Tour = require('../lib/models/Tour');

describe('tours routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

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

  it('gets all tours', async() => {
    const tour = JSON.parse(JSON.stringify(await Tour.create({
      title: 'Mind Exploration',
      launchDate: Date.now()
    })));

    return request(app)
      .get('/api/v1/tours')
      .then(res => {
        expect(res.body).toEqual([{
          _id: tour._id,
          title: 'Mind Exploration',
          launchDate: expect.any(String),
          activities: [],
          stops: []
        }]);
      });
  });

  it('gets tour by id', async() => {
    const tour = JSON.parse(JSON.stringify(await Tour.create({
      title: 'Mind Exploration',
      launchDate: Date.now()
    })));

    return request(app)
      .get(`/api/v1/tours/${tour._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: tour._id,
          title: 'Mind Exploration',
          launchDate: expect.any(String),
          activities: [],
          stops: []
        });
      });
  });
});
