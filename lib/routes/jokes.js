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
    })

    .get('/:id', (req, res) => {
        const { id } = req.params;
        Joke.findById(id).then(joke => res.json(joke));
    })

    .delete('/:id', (req, res) => {
        const { id } = req.params;
        Joke.deleteOne({ _id: id }).then(returned => {
            if(returned.n === 1) res.json({ removed: true });
            else res.json({ removed: false });
        });
    })

    .put('/:id', (req, res) => {
        const { id } = req.params;
        Joke.findOneAndUpdate(id, req.body, { new: true }).then(updatedJoke => res.json(updatedJoke));

    });