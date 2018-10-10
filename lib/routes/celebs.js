const router = require('express').Router();
const Celeb = require('../models/Celeb');

module.exports = router
    .post('/', (req, res) => {
        const { name, job, facts, known } = req.body;
        Celeb.create({ name, job, facts, known }).then(celeb => 
            res.json(celeb)
        );
    })

    .get('/', (req, res) => {
        Celeb.find().then(celebs => res.json(celebs));
    })

    .get('/:id', (req, res) => {
        const { id } = req.params; 
        Celeb.findById(id).then(celeb => res.json(celeb));
    })

    .put('/:id', (req, res) => {
        const { id } = req.params;
        const name = req.body;
        Celeb.findByIdAndUpdate(id, name, { new: true }).then(celeb => 
            res.json(celeb)
        );
    });
