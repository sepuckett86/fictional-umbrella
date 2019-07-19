require('dotenv').config();

const APPID = process.env.WEATHER_API_KEY;
const request = require('superagent');

// const latitude = 45.5155;
// const longitude = -122.6793;

function getWeather(latitude, longitude) {
  return request(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${APPID}`)
    .then(res => res.body);
}

module.exports = getWeather;

