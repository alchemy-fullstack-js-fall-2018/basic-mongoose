const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
    band: {
        type: String,
        required: true
    },
    albumName: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true,
        enum: ['Rock', 'Jazz', 'Classical', 'Electronic', 'Hip-Hop', 'Country', 'Folk', 'Latin', 'Other']
    },
    productionDetails: {
        producer: String,
        label: String,
        releaseDate: Date
    }
});

const Album = mongoose.model('Album', albumSchema);

module.exports = Album;
