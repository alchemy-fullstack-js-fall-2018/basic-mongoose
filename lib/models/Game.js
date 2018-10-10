const mongoose = require('mongoose');

const gameTypes = ['strategy', 'luck', 'role-playing', 'dexterity', 'communication'];

const gameSchema = new mongoose.Schema({
    title: {
        type: String,
        maxlength: 500, 
        required: true
    },
    mechanics: {
        numPlayers: {
            type: Number,
            required: true
        },
        minutesPerGame: {
            type: Number,
            min: 0,
            max: [180, 'No one wants to play a game this long!'],
            required: true
        }
    },
    type: {
        type: String,
        enum: gameTypes,
        required: true
    }
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;