const router = require('express').Router();
const Cafe = require('../models/Cafe');

module.exports = router
    .post('/', (req, res) => {
        const { name, address, roasters } = req.body;
        Cafe.create({ name, address, roasters }).then(cafe => {
            res.json(cafe);
        });
    })

    .get('/', (req, res) => {
        Cafe.find().then(cafes => res.json(cafes));
    })

    .get('/:id', (req, res) => {
        const { id } = req.params;
        Cafe.findById(id)
            .then(cafe => res.json(cafe));
    })
