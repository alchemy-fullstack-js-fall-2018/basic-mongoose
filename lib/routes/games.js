const router = require('express').Router();
const Game = require('../models/Game');

module.exports = router
    .post('/', (req, res) => {
        const { title, mechanics, type } = req.body;
        const { numPlayers, minutesPerGame } = mechanics;
        Game.create({ title, mechanics: { numPlayers, minutesPerGame }, type }).then(game => res.json(game));
    })

    .get('/', (req, res) => {
        const { query } = req;
        Game.find(query).then(games => res.json(games));
    })

    .get('/:id', (req, res) => {
        const { id } = req.params;
        Game.findById(id).then(games => res.json(games));
    })

    .delete('/:id', (req, res)  => {
        const { id } = req.params;
        Game.findByIdAndDelete(id)
            .then(game => !game ? res.json({ removed: false }) : res.json ({ removed: true }));
    })

    .put('/:id', (req, res)  => {
        const { id } = req.params;
        const { title, mechanics, type } = req.body;
        const { numPlayers, minutesPerGame } = mechanics;
        Game.findByIdAndUpdate(
            id,
            { title, mechanics: { numPlayers, minutesPerGame }, type },
            { new: true, runValidators: true }
        ).then(game => res.json(game));
    });
    