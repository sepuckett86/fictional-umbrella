const { Router } = require('express');
const Stop = require('../models/Stop');
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
      .then(stop => res.send(stop))
      .catch(next);
  });
