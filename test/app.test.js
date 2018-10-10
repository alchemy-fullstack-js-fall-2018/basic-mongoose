require('dotenv').config();
require('../lib/mongoose-connector')();
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../lib/app');
const Otter = require('../lib/models/Otters');
const Chance = require('chance');
const chance = new Chance();

describe('otter pub/sub API', () => {
    let otters = Array.apply(null, { length: 10 }).map(() => {
        return {
            commonName: chance.word(),
            status: 'Threatened',
            numOfPublishedWorks: chance.natural()
        };
    });

    let createdOtters;

    const createOtter = otter => {
        return request(app)
            .post('/api/otters')
            .send(otter)
            .then(res => res.body);
    };

    beforeEach(() => {
        return Otter.deleteMany();
    });

    beforeEach(() => {
        return Promise.all(otters.map(createOtter)).then(ottersRes => {
            createdOtters = ottersRes;
        });
    });

    afterAll(() => {
        mongoose.disconnect();
    });

    it('creates an otter on post', () => {
        return request(app)
            .post('/api/otters')
            .send({
                commonName: 'Hairy-Nosed Otter',
                status: 'Threatened',
                numOfPublishedWorks: 4
            })
            .then(res => {
                expect(res.body).toEqual({
                    _id: expect.any(String),
                    __v: expect.any(Number),
                    commonName: 'Hairy-Nosed Otter',
                    status: 'Threatened',
                    numOfPublishedWorks: 4
                });
            });
    }),

    it('gets all otters on get', () => {
        return request(app)
            .get('/api/otters')
            .then(retrievedOtters => {
                createdOtters.forEach(createdOtter => {
                    expect(retrievedOtters.body).toContainEqual(createdOtter);
                }); 
            });
    });

    it('gets an otter by id', () => {
        return request(app)
            .get(`/api/otters/${createdOtters[0]._id}`)
            .then(res => {
                expect(res.body).toEqual({ ...createdOtters[0], __v: expect.any(Number) });
            });
    });
});

