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
    })

    .get('/:id', (req, res) => {
        const { id } = req.params;
        Album.findById(id).then(album => res.json(album));
    })

    .put('/:id', (req, res) => {
        const { id } = req.params;
        const propertyToChange = req.body;
        Album.findByIdAndUpdate(id, propertyToChange, { new: true })
            .then(updatedAlbum => res.json(updatedAlbum));
    })
    
    .delete('/:id', (req, res) => {
        const { id } = req.params;
        Album.findByIdAndDelete(id, { rawResult: true })
            .then(removed => {
                if(removed.ok > 0) return res.json({ removed: true });
                else return res.json({ removed: false });
            });
    });
