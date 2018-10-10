const express = require('express');
const app = express();
const albums = require('./routes/albums');

app.use(express.json());

app.use('/api/albums', albums);

app.use((req, res) => {
    res.status(404).send('Not Found');
});

module.exports = app;
