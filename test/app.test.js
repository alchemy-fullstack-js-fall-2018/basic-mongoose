require('dotenv').config();
require('../lib/mongoose-connector')();
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
            .send(joke);
    };

    beforeEach(() => {
        //* Why does this work?  
        return Joke.deleteMany();
    });

    beforeEach(() => {
        return Promise.all(jokes.map(createJoke))
            .then(returnedJokes => {
                createdJokes = returnedJokes.map(joke => joke.body);
            });
    });

    afterAll(() => {
        //* Why do we do this?
        mongoose.disconnect();
    });

    it('creates a joke on post', () => {
        //* How do I refactor to remove repetition?
        return expect(createdJokes[0]).toEqual({
            __v: 0,
            _id: expect.any(String),
            joke1: jokes[0].joke1,
            joke2: jokes[0].joke2,
            category: jokes[0].category,
            forKids: jokes[0].forKids,
            rating: jokes[0].rating
        });
    });

    it('gets all jokes', () => {
        return request(app)
            .get('/api/jokes')
            .then(res => {
                expect(res.body).toContainEqual(createdJokes[0]);
                expect(res.body).toContainEqual(createdJokes[1]);
                expect(res.body).toContainEqual(createdJokes[2]);
            });
    });

    it('gets a joke by id', () => {
        return request(app)
            .get(`/api/jokes/${createdJokes[2]._id}`)
            .then(res => {
                expect(res.body).toEqual(createdJokes[2]);
            });
    });

    it('deletes a joke by id', () => {
        return request(app)
            .delete(`/api/jokes/${createdJokes[2]._id}`)
            .then(res => {
                expect(res).toEqual({ removed: true });
            });
    });

});
