const express = require('express');
const app = express();
const jokesRouter = require('./routes/jokes');

app.use(express.json());

app.use('/api/jokes', jokesRouter);

app.use((req, res) => {
    res.status(404).send('Not Found');
});

module.exports = app;