require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/class', { useNewUrlParser: true });

const carSchema = new mongoose.Schema({

    type: {
        type: String,
        enum: ['Used', 'NuNu aka brand new'],
        required: true
    },
    make: {
        type: String, 
        enum: ['Honda', 'Toyota', 'BMW'],
        min: 1,
        required: true
    },
    year: {
        type: Number, 
        enum: 
        [
            '1991', '1992', '1993', '1994', '1995', '1996', '1997', '1998', '1999', '2001', '2002', '2003',
            '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017',
            '2018'
        ],
        min: 0,
        required: true
    },
    model: {
        type: String,
        color: String,
        transmission: String,
        models: {
            type: String,
            enum: [
                'Accord', 'Civic', 'Prelude', 'Odyssey', 'Ridgeline', 'Corolla', 'Corona', 'Senata', 'M3',
                'M4', 'M5', '3 Series', '4 Series', '5 Series', '6 Series', '7 Series' 
            ]
        },
    },
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;

// Create a schema and model: 
//     * Pick at least three validations that the schema will have, two beyond `required`
//     * Also include in your schema:
//         * Include a complex object property (a property that has subfields, like an address with city, state, zip)
//         * An array property (a property that holds zero or more of some values)
//     * Unit test a successful model and test validations fail correctly.

