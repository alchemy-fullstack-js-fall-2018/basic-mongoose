const express = require('express');
const app = express();
const cafesRouter = require('./routes/cafes');

app.use(express.jsoin());

app.use('/api/cafes', cafesRouter);

app.use((req, res) => {
    res.status(404).send('Not Found');
});

module.exports = app;
