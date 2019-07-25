const mongoose = require('mongoose');

const stopSchema = new mongoose.Schema({
  location:	{
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    }
  },
  weather: {
    temp: Number,
    pressure: Number,
    humidity: Number,
    temp_min: Number,
    temp_max: Number
  },
  attendance:	{
    type: Number,
    min: 1
  }
});

const Stop = mongoose.model('Stop', stopSchema);
module.exports = Stop;
