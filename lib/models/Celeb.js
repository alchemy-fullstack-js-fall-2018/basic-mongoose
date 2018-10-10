const mongoose = require('mongoose');

const celebSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    job: {
        type: String, 
        required: true
    },
    facts: {
        hobbies: {
            type: [String],
            required: true
        },
        age: Number
    },
    known: {
        type: [String],
        required: true
    }
});

const Celeb = mongoose.model('Celeb', celebSchema);

module.exports = Celeb;
