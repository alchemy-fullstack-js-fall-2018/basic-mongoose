const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['alive', 'dead']
    },
    numOfPublishedWorks: {
        type: Number,
        min: 0
    }
});

const Author = mongoose.model('Author', authorSchema);

module.exports = Author;
