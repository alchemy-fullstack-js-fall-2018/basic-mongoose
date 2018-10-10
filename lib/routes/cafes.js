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

    .put('/:id', (req, res) => {
        const { id } = req.params;
        const { name, address, roasters } = req.body;
        const { street, city, zip } = address;
        console.log(req.body);
        Cafe.findByIdAndUpdate({ _id: id }, 
            { name, address: { street, city, zip }, roasters }, 
            { new: true, runValidators: true })
            .then(result => {
                res.json(result);
            });

    })

    .delete('/:id', (req, res) => {
        const { id } = req.params;
        Cafe.deleteOne({ _id: id })
            .then(result => {
                if(result.n > 0) res.json({ removed: true });
                else res.json({ removed: false });
            });
    })
