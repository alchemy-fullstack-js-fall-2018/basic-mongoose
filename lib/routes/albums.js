const router = require('express').Router();
const Album = require('../models/Album');

module.exports = router
    .post('/', (req, res) => {
        const { band, albumName } = req.body;
        Album.create({ band, albumName })
            .then(album => 
                res.json(album)
            );
    });
