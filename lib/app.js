const express = require('express');
const app = express();

app.use(express.json());

const cars = require('./routes/cars');
app.use('/api/cars', cars);

module.exports = app;
