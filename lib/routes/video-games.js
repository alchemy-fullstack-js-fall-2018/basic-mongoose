const router = require('express').Router();
const VideoGame = require('../models/Video-game');

module.exports = router
    .post('/', (req, res) => {
        const data = req.body;
        VideoGame.create(data).then(event => res.json(event));
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
            .then(game => !game ? res.json({ removed: false }) : res.json ({ removed: true }));
    })

    .put('/:id', (req, res) => {
        const { id } = req.params;
        const data = req.body;
        VideoGame.findByIdAndUpdate(id, data, { new: true }).then(game => res.json(game));
    });


