const express = require('express');
const app = express();
const albums = require('./routes/albums');

app.use(express.json());

app.use('/api/albums', albums);

module.exports = app;
