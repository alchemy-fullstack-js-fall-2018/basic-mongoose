const router = require('express').Router();
const Cars = require('../models/Cars');

module.exports = router
    .post('/', (req, res) => {
        const { type, make, year, models } = req.body;
        Cars.create({ type, make, year, models }).then(initiate =>
            res.json(initiate)
        );
    })

    .get('/', (req, res) => {
        Cars.getAll().then(getItAll => res.json(getItAll));
    })

    .get('/:id', (req, res) => {
        const { id } = req.params;
        Cars.get(id).then(getJustOne => res.json(getJustOne));
    })

    .delete('/:id', (req, res) => {
        const { id } = req.params;
        Cars.delete(id).then(remove => res.json(remove));
    })

    .put('/:id', (req, res) => {
        const { id } = req.params;
        const { type, make, year, models } = req.body;
        Cars.update(id, { type, make, year, models })
            .then(updatedCars => res.json(updatedCars));
    });





