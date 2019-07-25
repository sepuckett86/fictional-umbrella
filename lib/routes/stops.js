const { Router } = require('express');
const Stop = require('../models/Stop');
const Tour = require('../models/Tour');
const weather = require('../middleware/weather');

module.exports = Router()
  .post('/', weather, (req, res, next) => {
    const {
      location,
      attendance
    } = req.body;
    
    const weather = req.weather;

    Stop
      .create({
        location,
        weather,
        attendance
      })
      .then(stop => {
        return Tour
          .findByIdAndUpdate(req.tourId, { $push: { stops: stop._id } }, { new: true })
          .populate('stops');
      })
      .then(tour => res.send(tour))
      .catch(next);
  })
  .put('/:id/attendance', (req, res, next) => {
    Stop
      .findByIdAndUpdate(req.params.id, { attendance: req.body.attendance }, { new: true })
      .then(stop => res.send(stop))
      .catch(next);
  })
  .delete('/:id', (req, res, next) => {
    Tour
      .findByIdAndUpdate(req.tourId, { $pull: { stops: { $in: [{ _id: req.params.id }] } } })
      .then(() => {
        return Stop
          .findByIdAndDelete(req.params.id);
      })
      .then(stop => res.send(stop))
      .catch(next);
  });
