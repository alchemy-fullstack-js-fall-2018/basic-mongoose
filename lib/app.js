const express = require('express');
const app = express();

app.use(express.json());

const games = require('./routes/games');
app.use('/games', games);

module.exports = app;