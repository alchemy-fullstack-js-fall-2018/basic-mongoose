const mongoose = require('mongoose');

const otterSchema = new mongoose.Schema({
    name: {
        commonName: { type: String, required: true },
        latinName: { type: String, required: true }
    },
    status: {
        type: String,
        enum: ['Least Concern', 'Threatened', 'Extinct']
    },
    areasFound: {
        type: Array
    },
    numOfPublishedWorks: {
        type: Number,
        min: 0
        // max: 20
    }
});

const Otter = mongoose.model('Otter', otterSchema);

module.exports = Otter;
