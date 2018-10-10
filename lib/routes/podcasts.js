const router = require('express').Router();
const Podcast = require('../models/Podcast');

module.exports = router
    .post.skip('/', (req, res) => {
        const { name, type, episodes, length } = req.body;
        Podcast.create({ name, type, episodes, length }).then(podcast =>
            res.json(podcast)
        );
    })

    .get('/', (req, res) => {
        Podcast.find().then(events => res.json(events));
    })

    .get('/:id', (req, res) => {
        const { id } = req.params;
        Podcast.findById(id).then(event => res.json(event));
    });
