const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
    band: {
        type: String,
        required: true
    },
    albumName: {
        type: String,
        required: true
    }
});

const Album = mongoose.model('Album', albumSchema);

module.exports = Album;
