const router = require('express').Router();
const Otter = require('../models/Otters');

module.exports = router
    .post('/', (req, res) => {
        const { commonName, status, numOfPublishedWorks } = req.body;
        Otter.create({ commonName, status, numOfPublishedWorks })
            .then(otter => res.json(otter));
    })

    .get('/', (req, res) => {
        Otter.find().then(otters => res.json(otters));
    })

    .get('/:id', (req, res) => {
        const { id } = req.params;
        Otter.findById(id).then(otter => res.json(otter));
    });
