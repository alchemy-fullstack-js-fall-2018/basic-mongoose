const router = require('express').Router();
const Games = require('../models/Games');

module.exports = router
    .post('/', (req, res) => {
        const { title, numPlayers, minutesPerGame } = req.body;
        Games.create({ title, numPlayers, minutesPerGame }).then(game => res.json(game));
    })

    .get('/', (req, res) => {
        Games.getAll().then(games => res.json(games));
    })

    .get('/:id', (req, res) => {
        const { id } = req.params;
        Games.get(id).then(games => res.json(games));
    })

    .delete('/:id', (req, res)  => {
        const { id } = req.params;
        Games.delete(id).then(games => res.json(games));
    })

    .put('/:id', (req, res)  => {
        const { id } = req.params;
        const { title, numPlayers, minutesPerGame } = req.body;
        Games.update(id, { title, numPlayers, minutesPerGame }).then(game => res.json(game));
    });