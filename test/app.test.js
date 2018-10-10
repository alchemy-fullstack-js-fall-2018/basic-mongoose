require('dotenv').config();
require('../lib/mongoose-connector')();
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../lib/app');
const Cars = require('../lib/models/Cars');
const Chance = require('chance');
const chance = new Chance();

describe('all about cars', () => {

    let carsArray = Array.apply(null, { length: 100 }).map(() => {
        return {
            type: 'new',
            make: 'honda',
            year: chance.year(),
            models: chance.word()
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
        return db('cars').then(collection => collection.deleteMany());
    });

    beforeEach(() => {
        return Promise.all(carsArray.map(createCar)).then(carsResonse => {
            createdCars = carsResonse;
        });
    });

    it('creates new car info on post', () => {
        return request(app)
            .post('/api/cars')
            .send({
                type: 'new',
                make: 'honda',
                year: '2018',
                models: 'accord'
            })
            .then(res => {
                expect(res.body).toEqual({
                    _id: expect.any(String),
                    type: 'new',
                    make: 'honda',
                    year: '2018',
                    models: 'accord'
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
            .send({ type: 'used', make: 'bmw', year: '2018', models: 'm3' })
            .then(res => {
                expect(res.body).toEqual({ _id: expect.any(String), type: 'used', make: 'bmw', year: '2018', models: 'm3' });
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
