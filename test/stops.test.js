require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');

const Tour = require('../lib/models/Tour');
// const Stop = require('../lib/models/Stop');

describe('stops routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  let tour;
  beforeEach(async() => {
    tour = JSON.parse(JSON.stringify(await Tour.create({
      title: 'Mind Exploration',
      launchDate: Date.now()
    })));
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('posts a new stop', () => {
    const stop = {
      location: {
        latitude: 45.5155,
        longitude: 122.6793
      },
      weather: {
        temp: 299.87,
        pressure: 1007,
        humidity: 61,
        temp_min: 292.59,
        temp_max: 305.93
      },
      attendance: 100
    };

    return request(app)
      .post(`/api/v1/tours/${tour._id}/stops`)
      .send(stop)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          location: {
            latitude: 45.5155,
            longitude: 122.6793
          },
          weather: {
            temp: 299.87,
            pressure: 1007,
            humidity: 61,
            temp_min: 292.59,
            temp_max: 305.93
          },
          attendance: 100,
          __v: 0
        });
      });
  });
});
