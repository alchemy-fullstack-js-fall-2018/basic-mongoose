const mongoose = require('mongoose');

const videoGameSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    }, 
    system: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    }
});

const VideoGame = mongoose.model('VideoGame', videoGameSchema);

module.exports = VideoGame;

