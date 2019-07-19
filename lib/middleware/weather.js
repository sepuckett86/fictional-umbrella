const getWeather = require('../utils/getWeather');

const weather = (req, res, next) => {
  const latitude = req.body.location.latitude;
  const longitude = req.body.location.longitude;
  getWeather(latitude, longitude)
    .then(apiResponse => {
      req.weather = apiResponse.main;
      next();
    });
};

module.exports = weather;
