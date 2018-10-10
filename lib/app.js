const express = require('express');
const app = express();
const gamesRouter = require('./routes/vieo-games');

app.use(express.json());

app.use('/api/video-games', gamesRouter);

app.use((req, res) => {
    res.status(404).send('Not Found');
});

module.exports = app;
