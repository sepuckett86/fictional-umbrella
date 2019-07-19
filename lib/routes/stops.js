const { Router } = require('express');
const Stop = require('../models/Stop');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      location,
      weather,
      attendance
    } = req.body;
    
    Stop
      .create({
        location,
        weather,
        attendance
      })
      .then(stop => res.send(stop))
      .catch(next);
  });
