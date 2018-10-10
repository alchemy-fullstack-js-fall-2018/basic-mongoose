require('dotenv').config();
require('..lib/mongoose-connector');
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../lib/app.js');
const Joke = require('../lib/models/Joke');

describe('knock knock jokes API', () => {
    const jokes = [
        {
            joke1: 'Cow says.',
            joke2: 'No, a cow says mooooooo!',
            category: '___ says',
            forKids: true,
            rating: 0.6
        },
        {
            joke1: 'A little old lady',
            joke2: 'All this time, I had no idea you could yodel.',
            category: 'onomatopoeia',
            forKids: true,
            rating: 0.8
        },
        {
            joke1: 'Honeydew.',
            joke2: 'Honeydew you know how fine you look right now?',
            category: 'pick up lines',
            forKids: false,
            rating: 0
        }

    ];

    let createdJokes;

    const createJoke = joke => {
        return request(app)
            .post('/api/jokes')
            .send(joke)
            //* Why explicitly state this here and not elsewhere?
            .then(res => res.body);
    };

    beforeEach(() => {
        //* Why does this work?  
        return Joke.deleteMany();
    });

    beforeEach(() => {
        return Promise.all(jokes.map(createJoke))
            .then(jokesRes => {
                createdJokes = jokesRes;
            });
    });

    afterAll(() => {
        //* Why do we do this?
        mongoose.disconnect();
    });

});
