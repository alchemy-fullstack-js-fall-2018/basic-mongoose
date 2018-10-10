const router = require('express').Router();
const VideoGame = require('../models/Video-game');

module.exports = router
    .post('/', (req, res) => {
        const { title, yearReleased, manufacturer, system, genre, completed } = req.body;
        VideoGame.create({ title, yearReleased, manufacturer, system, genre, completed }).then(event => res.json(event));
    })
    
    .get('/', (req, res) => {
        const { query } = req;
        VideoGame.find(query).then(games => res.json(games));
    })

    .get('/:id', (req, res) => {
        const { id } = req.params;
        VideoGame.findById(id).then(game => res.json(game));
    })

    .delete('/:id', (req, res) => {
        const { id } = req.params;
        VideoGame.findByIdAndDelete(id)
            .then(game => res.json ({ removed: !!game }));
    })

    .put('/:id', (req, res) => {
        const { id } = req.params;
        const { title, system, genre } = req.body;
        VideoGame.findByIdAndUpdate(id, { title, system, genre }, { new: true }).then(game => res.json(game));
    });


