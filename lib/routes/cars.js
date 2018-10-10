const router = require('express').Router();
const Cars = require('../models/Car');

module.exports = router
    .post('/', (req, res) => {
        const { type, make, year, models } = req.body;
        Cars.create({ type, make, year, models }).then(initiate =>
            res.json(initiate)
        );
    })

    .get('/', (req, res) => {
        const { query } = req;
        Cars.find(query).then(getItAll => res.json(getItAll));
    })

    .get('/:id', (req, res) => {
        const { id } = req.params;
        Cars.findById(id).then(getJustOne => res.json(getJustOne));
    })

    .delete('/:id', (req, res) => {
        const { id } = req.params;
        Cars.deleteOne({ _id: id }).then(remove => res.json({ removed: remove.n > 0 }));
    })

    .put('/:id', (req, res) => {
        const { id } = req.params;
        const { type, make, year } = req.body;
        Cars.findByIdAndUpdate(id, { type, make, year }, { new: true })
            .then(updatedCars => res.json(updatedCars));
    });





