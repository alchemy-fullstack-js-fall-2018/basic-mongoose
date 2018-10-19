const router = require('express').Router();
const Podcast = require('../models/Podcast');

module.exports = router
    .post('/', (req, res) => {
        const { name, type, episodes, length } = req.body;
        Podcast.create({ name, type, episodes, length }).then(podcast =>
            res.json(podcast)
        );
    })

    .get('/', (req, res) => {
        const { query } = req.body;
        Podcast.find(query).then(podcasts => res.json(podcasts));
    })

    .get('/:id', (req, res) => {
        const { id } = req.params;
        Podcast.findById(id).then(podcast => res.json(podcast));
    })

    .put('/:id', (req, res) => {
        const { id } = req.params;
        Podcast.findOneAndUpdate(id, req.body, { new: true }).then(podcast => res.json(podcast));
    })

    .delete('/:id', (req, res) => {
        const { id } = req.params;
        Podcast.findByIdAndRemove(id).then(results => {
            if(!results) res.json({ removed: false });
            else res.json({ removed: true });
        });
    });


