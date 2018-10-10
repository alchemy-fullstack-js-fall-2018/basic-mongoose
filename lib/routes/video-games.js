const router = require('express').Router();
const VideoGame = require('../models/Video-game');

module.exports = router
    .post('/', (req, res) => {
        const { title, system, genre } = req.body;
        VideoGame.create({ title, system, genre }).then(event =>
            res.json(event)
        );
    });
    
