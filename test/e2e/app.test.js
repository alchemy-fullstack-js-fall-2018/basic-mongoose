require('dotenv').config();
require('../../lib/mongoose-connector')();
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../lib/app');
const Aircraft = require('../../lib/models/Aircraft');

describe('Aircraft E2E test', () => {


    const aircrafts = [
        {
            name: {
                official: 'AH-64',
                nickname: 'Apache',
                variants: ['AH-64A', 'AH-64B', 'AH-64C', 'AH-64D', 'AH-64E', 'AH-64F']
            },
            specs: {
                type: ['helicopter', 'close air support'],
                armament: {
                    gun: 'M230 Chain Gun',
                    wingtip: 2,
                    underwing: 70
                },
                speed: 227
            },
            history: {
                released: 1986,
                active: true
            }
        },
        {
            name: {
                official: 'F-16',
                nickname: 'Fighting Falcon',
                variants: ['F-16A/B', 'F-16C/D']
            },
            specs: {
                type: ['fighter'],
                armament: {
                    gun: 'M61A1 Vulcan',
                    wingtip: 2,
                    underwing: 6,
                    underfueselage: 3
                },
                speed: 1500
            },
            history: {
                released: 1978,
                active: true
            }
        },
        {
            name: {
                official: 'SR-71',
                nickname: 'Blackbird',
                variants: ['SR-71A', 'SR-71B', 'SR-71C']
            },
            specs: {
                type: ['support'],
                speed: 2200
            },
            history: {
                released: 1966,
                active: false
            }
        }];

    let createdAircrafts;

    const lockheedMartin = aircraft => {
        return request(app)
            .post('/api/aircrafts')
            .send(aircraft);
        //  .then(res => res.body);
    };

    beforeEach(() => {
        return Aircraft.deleteMany();
    });
    beforeEach(() => {
        return Promise.all(aircrafts.map(lockheedMartin))
            .then(ca => createdAircrafts = ca.map(a => a.body));
    });
    // beforeEach(() => {
    //     return Promise.all(aircrafts.map(lockheedMartin)).then(aircraftsRes => {
    //         createdAircrafts = aircraftsRes;
    //     });
    // });

    afterAll(() => {
        mongoose.disconnect();
    });

    // alt:
    // beforeEach(async() => {
    //     const ca = await Promise.all(aircrafts.map(lockheedMartin));
    //     return createdAircrafts = ca.map(a => a.body);
    // });

    it('get an aircraft by id', () => {
        return request(app)
            .get(`/api/aircrafts/${createdAircrafts[0]._id}`)
            .then(res => expect(res.body).toEqual(createdAircrafts[0]));
    });

    it('gets all events on get', () => {
        return request(app)
            .get('/api/aircrafts')
            .then(retrievedAircrafts => {
                createdAircrafts.forEach(createdAircraft => {
                    expect(retrievedAircrafts.body).toContainEqual(createdAircraft);
                });
            });
    });


    // it('creates an aircraft on post', () => {
    //     return request(app)
    //         .post('/api/aircrafts')
    //         .send({ type: 'A-10', nickname: 'Thunderbird', speed: 439, released: 1977, active: true })
    //         .then(res => expect(res.body).toEqual({ _id: expect.any(String), type: 'A-10', nickname: 'Thunderbird', speed: 439, released: 1977, active: true }));
    // });

    // it('updates an aircraft on put', () => {

    //     const upgrade = { type: 'AH-65', nickname: 'Mohawk', speed: 999, released: 2020, active: true };
    //     const expected = { ...upgrade, _id: expect.any(String) };
    //     return request(app)
    //         .put(`/api/aircrafts/${createdAircrafts[0]._id}`)
    //         .send(upgrade)
    //         .then(res => expect(res.body).toEqual(expected));

    // });

    // it('demolishes an aircraft on delete', () => {
    //     return request(app)
    //         .delete(`/api/aircrafts/${createdAircrafts[0]._id}`)
    //         .then(destroyedAircraft => request(app).get(`/api/aircraft/${destroyedAircraft.body._id}`))
    //         .then(res => expect(res.body).toEqual({}));
    // });


});


