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

    Tour
      .findById(req.tourId)
      .then(tour => {
        Stop
          .create({
            location,
            weather,
            attendance
          })
          .then(stop => {
            const updatedStops = [...tour.stops, stop];
            Tour
              .findByIdAndUpdate(req.tourId, { ...tour.toJSON(), stops: updatedStops }, { new: true })
              .populate('stops')
              .then(updatedTour => {
                res.send(updatedTour);
              })
              .catch(next);
          })
          .catch(next);
      })
      .catch(next);
  });
