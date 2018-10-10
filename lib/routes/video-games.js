const router = require('express').Router();
const VideoGame = require('../models/Video-game');

module.exports = router
    .post('/', (req, res) => {
        const { title, system, genre } = req.body;
        VideoGame.create({ title, system, genre }).then(event => res.json(event));
    })
    
    .get('/', (req, res) => {
        VideoGame.find().then(games => res.json(games));
    })

    .get('/:id', (req, res) => {
        const { id } = req.params;
        VideoGame.findById(id).then(game => res.json(game));
    });
