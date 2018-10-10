const express = require('express');
const app = express();
const celebsRouter = require('./routes/celebs');

app.use(express.json());

app.use('/api/celebs', celebsRouter);

app.use((req, res) => {
    res.status(404).send('Not Found');
});

module.exports = app;
