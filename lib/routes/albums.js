const router = require('express').Router();
const Album = require('../models/Album');

module.exports = router
    .post('/', (req, res) => {
        const { band, albumName, genre, productionDetails } = req.body;
        Album.create({ band, albumName, genre, productionDetails })
            .then(album => 
                res.json(album)
            );
    })

    .get('/', (req, res) => {
        Album.find().then(albums => res.json(albums));
    });
