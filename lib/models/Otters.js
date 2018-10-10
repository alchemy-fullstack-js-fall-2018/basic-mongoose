const mongoose = require('mongoose');

const otterSchema = new mongoose.Schema({
    commonName: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Least Concern', 'Threatened', 'Extinct']
    },
    numOfPublishedWorks: {
        type: Number,
        min: 0
    }
});

const Otter = mongoose.model('Otter', otterSchema);

module.exports = Otter;
