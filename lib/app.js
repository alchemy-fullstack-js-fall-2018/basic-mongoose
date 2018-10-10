const express = require('express');
const app = express();
const ottersRouter = require('./routes/otters');

app.use(express.json());

app.use('/api/otters', ottersRouter);

app.use((req, res) => {
    res.status(404).send('Not Found');
});

module.exports = app;
