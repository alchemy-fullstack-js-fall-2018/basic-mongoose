const mongoose = require('mongoose');

const cafeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        street: {
            type: String,
            required: true
        },
        city: {
            type: String,
            enum: [
                'Portland', 
                'Los Angeles', 
                'Seattle', 
                'San Francisco'
            ],
            required: true
        },
        zip: {
            type: Number
        }        
    },
    roasters: [String]
});

const Cafe = mongoose.model('Cafe', cafeSchema);

module.exports = Cafe;
