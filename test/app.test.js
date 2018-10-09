require('dotenv').config();
require('../lib/mongoose-connector')();
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../lib/app');
const Album = require('../lib/models/Album');


describe('albums DB', () => {

    it('creates an album', () => {
        return request(app)
            .post('/api/albums')
            .send({
                band: 'Pink Floyd',
                albumName: 'Division Bell'
            })
            .then(res => {
                expect(res.body).toEqual({
                    _id: expect.any(String),
                    __v: expect.any(Number),
                    band: 'Pink Floyd',
                    albumName: 'Division Bell'
                });
            });
    });
});
