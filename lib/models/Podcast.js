const mongoose = require('mongoose');

const podcastSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['murder', 'cult', 'comedy', 'sports', 'romance', 'advice', 'storytelling'],
        required: true
    },
    episodes: {
        type: Number,
        required: true
    },
    length: {
        type: Number,
        required: true
    }
});

const Podcast = mongoose.model('Podcast', podcastSchema);

module.exports = Podcast;
