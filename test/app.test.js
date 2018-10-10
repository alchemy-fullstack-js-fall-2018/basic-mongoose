require('dotenv').config();
require('../lib/connect')();
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../lib/app');
const Cars = require('../lib/models/Car');
const Chance = require('chance');
const chance = new Chance();

describe('all about cars', () => {

    let carsArray = Array.apply(null, { length: 3 }).map(() => {
        return {
            type: 'Used',
            make: 'Honda',
            year: chance.year(),
            model: {
                color: 'black',
            },
        };
    });

    let createdCars;

    const createCar = cars => {
        return request(app)
            .post('/api/cars')
            .send(cars)
            .then(res => res.body);        
    };

    beforeEach(() => {
        return Cars.deleteMany();
    });

    beforeEach(() => {
        return Promise.all(carsArray.map(createCar)).then(carsResonse => {
            createdCars = carsResonse;
        });
    });

    afterAll(() => {
        mongoose.disconnect();
    });

    it('creates new car info on post', () => {
        return request(app)
            .post('/api/cars')
            .send({
                type: 'Used',
                make: 'Honda',
                year: 2018,
            })
            .then(res => {
                expect(res.body).toEqual({
                    _id: expect.any(String),
                    __v: expect.any(Number),
                    type: 'Used',
                    make: 'Honda',
                    year: 2018,
                });
            });
    });

    it('gets all cars on get', () => {
        return request(app)
            .get('/api/cars')
            .then(retrievedCars => {
                createdCars.forEach(createdCarsInformation => {
                    expect(retrievedCars.body).toContainEqual(createdCarsInformation);
                });
            });
    });

    it('gets a car by id', () => {
        return request(app)
            .get(`/api/cars/${createdCars[0]._id}`)
            .then(res => {
                expect(res.body).toEqual(createdCars[0]);
            });
    });

    it('updates car info', () => {
        return request(app).put(`/api/cars/${createdCars[0]._id}`)
            .send({
                type: 'Used', 
                make: 'BMW', 
                year: 2018 
            })
            .then(res => {
                expect(res.body).toEqual({
                    _id: expect.any(String),
                    __v: expect.any(Number), 
                    type: 'Used', 
                    make: 'BMW', 
                    year: 2018 
                });
            });
    });

    it('deletes car info', () => {
        return request(app).delete(`/api/cars/${createdCars[0]._id}`)
            .then(res => {
                expect(res.body).toEqual({ removed: true });
            });    
    });

    it('returns 404 when there is no method', () => {
        return request(app)
            .patch('/error')
            .send({})
            .then(res => {
                expect(res.statusCode).toEqual(404);
            });
    });

    it('returns 404 when there is no route or a bad route', () => {
        return request(app).post('/error').then(res => {
            expect(res.statusCode).toEqual(404);
        });
    });

});
