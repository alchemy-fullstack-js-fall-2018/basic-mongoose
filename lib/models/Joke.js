const mongoose = require('mongoose');

const knockKnockJokeSchema = new mongoose.Schema({
    joke1: {
        type: String,
        required: true
    },
    joke2: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    forKids: {
        type: Boolean,
        required: true
    },
    rating: {
        type: Number,
        min: 0,
        max: 1,
        required: true
    }
});

const Joke = mongoose.model('Knock Knock Joke', knockKnockJokeSchema);

module.exports = Joke;