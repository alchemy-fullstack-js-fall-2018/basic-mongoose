const router = require('express').Router();
const Cafe = require('../models/Cafe');

module.exports = router
    .post('/', (req, res) => {
        const { name, address, roasters } = req.body;
        Cafe.create({ name, address, roasters }).then(cafe => {
            res.json(cafe);
        });
    });
