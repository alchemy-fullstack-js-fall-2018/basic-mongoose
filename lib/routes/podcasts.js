const router = require('express').Router();
const Event = require('../models/Podcast');

module.exports = router
    .post('/', (req, res) => {
        const { name, type, episodes, length } = req.body;
        Podcast.create({ name, type, episodes, length }).then(podcast =>
            res.json(podcast)
        );
    })

    .get('/', (req, res) => {
        Event.find().then(events => res.json(events));
    })

    .get('/:id', (req, res) => {
        const { id } = req.params;
        Event.findById(id).then(event => res.json(event));
    });
