const express = require('express');
const app = express();
const cars = require('./routes/cars');

app.use(express.json());

app.use('/api/cars', cars);

app.use((res, req) => {
    res.statusCode(404).send('Not Found');
});

module.exports = app;
