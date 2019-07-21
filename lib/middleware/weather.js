const getWeather = require('../utils/getWeather');

const weather = (req, res, next) => {
  const latitude = req.body.location.latitude;
  const longitude = req.body.location.longitude;
  if(!req.body.weather) {
    getWeather(latitude, longitude)
      .then(apiResponse => {
        req.weather = apiResponse.main;
        next();
      });
  } else {
    req.weather = req.body.weather;
    next();
  }
};

module.exports = weather;
