const router = require('express').Router();
const Celeb = require('../models/Celeb');

module.exports = router
    .post('/', (req, res) => {
        const { name, job, facts, known } = req.body;
        Celeb.create({ name, job, facts, known }).then(celeb => 
            res.json(celeb)
        );
    });
