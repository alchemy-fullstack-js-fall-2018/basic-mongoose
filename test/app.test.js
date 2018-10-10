require('dotenv').config();
require('../lib/mongoose-connector')();
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../lib/app');
const Album = require('../lib/models/Album');


describe('albums DB', () => {

    let albums = [
        { 
            band: 'The Rolling Stones', 
            albumName: 'Goats Head Soup', 
            genre: 'Rock',
            productionDetails: {
                producer: 'Jimmy Miller',
                label: 'Rolling Stones',
                releaseDate: new Date('1973-08-31T03:24:00')
            }
        },
        { 
            band: 'The Beatles', 
            albumName: 'Revolver', 
            genre: 'Rock',
            productionDetails: {
                producer: 'George Martin',
                label: 'Parlophone',
                releaseDate: new Date('1966-08-05T03:24:00')
            }
        }
    ];

    let createdAlbums;

    const createAlbum = album => {
        return request(app)
            .post('/api/albums')
            .send(album)
            .then(res => res.body);
    };

    beforeEach(() => {
        return Album.deleteMany();
    });

    beforeEach(() => {
        return Promise.all(albums.map(createAlbum)).then(albumsRes => {
            createdAlbums = albumsRes;
        });
    });

    afterAll(() => {
        mongoose.disconnect();
    });

    it('creates an album', () => {
        return request(app)
            .post('/api/albums')
            .send({ 
                band: 'Miles Davis', 
                albumName: 'Miles Ahead', 
                genre: 'Jazz',
                productionDetails: {
                    producer: 'George Avakian',
                    label: 'Columbia',
                    releaseDate: new Date('1957-10-21T03:24:00')
                }
            })
            .then(res => {
                expect(res.body).toEqual({
                    _id: expect.any(String),
                    __v: expect.any(Number), 
                    band: 'Miles Davis', 
                    albumName: 'Miles Ahead', 
                    genre: 'Jazz',
                    productionDetails: {
                        producer: 'George Avakian',
                        label: 'Columbia',
                        releaseDate: new Date('1957-10-21T03:24:00').toISOString()
                    }
                });
            });
    });

    it('gets all albums on get', () => {
        return request(app)
            .get('/api/albums')
            .then(retrievedAlbums => {
                createdAlbums.forEach(createdAlbum => {
                    expect(retrievedAlbums.body).toContainEqual(createdAlbum);
                });
            });
    });

    it('gets an album by id', () => {
        return request(app)
            .get(`/api/albums/${createdAlbums[1]._id}`)
            .then(res => {
                expect(res.body).toEqual(createdAlbums[1]);
            });
    });

    it('updates an album when supplied the album\'s id', () => {
        return request(app)
            .put(`/api/albums/${createdAlbums[1]._id}`)
            .send({ albumName: 'Abbey Road' })
            .then(res => {
                expect(res.body).toEqual({ ...createdAlbums[1], albumName: 'Abbey Road' })
            });
    });

    it('deletes an album when supplied the album\'s id', () => {
        return request(app)
            .delete(`/api/albums/${createdAlbums[1]._id}`)
            .then(res => {
                expect(res.body).toEqual({ removed: true });
            });
    });
});
