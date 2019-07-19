const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  activities: [String],
  launchDate: {
    type: Date,
    default: Date.now
  },
  stops: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Stop'
  }]
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
