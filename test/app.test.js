require('dotenv').config();
require('../lib/mongoose-connector')();
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../lib/app');
const Podcast = require('../lib/models/Podcast');
const Chance = require('chance');
const chance = new Chance();

describe('podcast pub/sub API', () => {
    let podcasts = Array.apply(null, { length: 30 }).map(() => {
        return {
            id: chance.guid({ version: 4 }),
            name:'Last Podcast on the Left',
            type: 'murder',
            episodes: 350,
            length: '60 min'
        };
    });
    let createdPodcasts;

    const createPodcast = podcast => {
        return request(app)
            .post('/api/podcasts')
            .send(podcast)
            .then(res => res.body);
    };

    beforeEach(() => {
        return Podcast.deleteMany();
    });

    beforeEach(() => {
        return Promise.all(podcasts.map(createPodcast)).then(podcastsRes => {
            createdPodcasts = podcastsRes;
        });
    });

    afterAll(() => {
        mongoose.disconnect();
    });

    it('creates a podcast on post', () => {
        return request(app)
            .post('/api/podcasts')
            .send({
                id: chance.guid({ version: 4 }),
                name: 'Last Podcast on the Left',
                type: 'murder',
                episodes: '350',
                length: '60 min'
            })
            .then(res => {
                expect(res.body).toEqual({
                    _id: expect.any(String),
                    __v: expect.any(Number),
                    name: 'Last Podcast on the Left',
                    type: 'murder',
                    episodes: '350',
                    length: '60 min'
                });
            });
    });
});
