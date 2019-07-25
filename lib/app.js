const express = require('express');
const app = express();

app.use(express.json());

app.use('/api/v1/tours', require('./routes/tours'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
