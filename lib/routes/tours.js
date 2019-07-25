const { Router } = require('express');
const stopsRouter = require('./stops');
const Tour = require('../models/Tour');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      title,
      activities,
      launchDate,
      stops
    } = req.body;

    Tour
      .create({ 
        title,
        activities,
        launchDate,
        stops
      })
      .then(tour => res.send(tour))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Tour
      .find()
      .select({ __v: false })
      .then(tours => res.send(tours))
      .catch(next);
  })
  .get('/:tourId', (req, res, next) => {
    Tour
      .findById(req.params.tourId)
      .select({ __v: false })
      .then(tour => res.send(tour))
      .catch(next);
  })
  .use('/:tourId/stops', (req, res, next) => {
    req.tourId = req.params.tourId;
    next();
  }, stopsRouter);
