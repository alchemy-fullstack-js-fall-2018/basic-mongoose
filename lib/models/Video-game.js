const mongoose = require('mongoose');

const videoGameSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    yearReleased: {
        type: Number,
        required: false,
        min: 1956
    },
    manufacturer: {
        type: String,
        required: false
    },
    system: {
        type: String,
        required: true,
        enum: ['Arcade', 'Nintendo', 'Playstation', 'Xbox', 'PC', 'Handheld']
    },
    genre: {
        type: String,
        required: true,
        enum: ['Fighting', 'Platformer', 'Puzzle', 'Action', 'RPG']
    },
    completed: {
        type: Boolean,
        default: false,
        required: false
    }
});

const VideoGame = mongoose.model('VideoGame', videoGameSchema);

module.exports = VideoGame;

