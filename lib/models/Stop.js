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
    temp: {
      type: Number,
      required: true
    },
    pressure: Number,
    humidity: Number,
    temp_min: Number,
    temp_max: Number
  },
  attendence:	{
    type: Number,
    min: 1
  }
});

const Stop = mongoose.model('Stop', stopSchema);
module.exports = Stop;
