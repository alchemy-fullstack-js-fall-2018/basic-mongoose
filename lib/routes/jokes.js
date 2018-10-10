const router = require('express').Router();
const Joke = require('../models/Joke');

module.exports = router
    .post('/', (req, res) => {
        const { joke1, joke2, category, forKids, rating } = req.body;
        Joke.create({ joke1, joke2, category, forKids, rating }).then(joke => {
            res.json(joke);
        });
    })

    .get('/', (req, res) => {
        Joke.find().then(jokes => res.json(jokes));
    });