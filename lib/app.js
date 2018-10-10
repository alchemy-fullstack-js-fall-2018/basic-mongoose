const express = require('express');
const app = express();
const podcastsRouter = require('./routes/podcasts');

app.use(express.json());

app.use('/api/podcasts', podcastsRouter);

app.use((req, res) => {
    res.status(404).send('Not Found');
});

module.exports = app;
