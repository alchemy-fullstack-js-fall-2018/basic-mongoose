require('dotenv').config();
require('../lib/mongoose-connector')();
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../lib/app');
const Cafe = require('../lib/models/Cafe');
const Chance = require('chance');
const chance = new Chance();

describe('cafe API', () => {
    let cafes = Array.apply(null, { length: 50 }).map(() => {
        return {
            name: chance.string(),
            address: {
                street: chance.string(),
                city: 'Los Angeles',
                zip: chance.integer(),
            },
            roasters: [
                'some roaster', 
                'some other roaster'
            ]
        };
    });

    let createdCafes;

    const createCafe = cafe => {
        return request(app)
            .post('/api/cafes')
            .send(cafe)
            .then(res => res.body);
    };

    beforeEach(() => {
        return Cafe.deleteMany();
    });

    beforeEach(() => {
        return Promise.all(cafes.map(createCafe)).then(cafesRes => {
            createdCafes = cafesRes;
        });
    });


    afterAll(() => {
        mongoose.disconnect();
    });

    it('creates a cafe on POST', () => {
        return request(app).post('/api/cafes')
            .send({
                name: 'Ristretto Roasters',
                address: {
                    street: '555 NE Couch',
                    city: 'Portland',
                    zip: 97232
                },
                roasters: ['Ristretto Roasters']
            })
            .then(res => {
                expect(res.body).toEqual({
                    _id: expect.any(String),
                    __v: expect.any(Number),
                    name: 'Ristretto Roasters',
                    address: {
                        street: '555 NE Couch',
                        city: 'Portland',
                        zip: 97232
                    },
                    roasters: ['Ristretto Roasters']
                });
            });
    });

    it('gets all cafes on GET', () => {
        return request(app).get('/api/cafes')
            .then(retrievedCafes => {
                createdCafes.forEach(createdCafe => {
                    expect(retrievedCafes.body).toContainEqual(createdCafe);
                });
            });
    });

    it('gets a cafe by ID on GET', () => {
        return request(app).get(`/api/cafes/${createdCafes[0]._id}`)
            .then(retrievedCafe => {
                expect(retrievedCafe.body).toEqual(createdCafes[0]);
            });
    });
});
