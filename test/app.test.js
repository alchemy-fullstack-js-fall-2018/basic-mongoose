require('dotenv').config();
require('../lib/mongoose-connector')();
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../lib/app');
const VideoGame = require('../lib/models/Video-game');
const Chance = require('chance');
const chance = new Chance();


describe('VideoGames pub/sub API', () => {
    
    let createdGames;

    let games = Array.apply(null, { length: 25 }).map(() => {
        return {
            title: 'random game title',
            system: 'Arcade',
            genre: 'Fighting'
        };
    });
    
    const createGame = game => {
        return request(app)
            .post('/api/video-games')
            .send(game)
            .then(res => res.body);
    };

    beforeEach(() => {
        return VideoGame.deleteMany();
    });

    beforeEach(() => {
        return Promise.all(games.map(createGame)).then(gamesRes => {
            createdGames = gamesRes;
        });
    });

    afterAll(() => {
        mongoose.disconnect();
    });

    it('creates an game on post', () => {
        return request(app)
            .post('/api/video-games')
            .send({
                title: 'Street Fighter',
                system: 'Arcade',
                genre: 'Fighting'
            })
            .then(res => {
                expect(res.body).toEqual({
                    _id: expect.any(String),
                    __v: expect.any(Number),
                    title: 'Street Fighter',
                    system: 'Arcade',
                    genre: 'Fighting',
                    completed: false

                });
            });
    });

    it('gets all games', () => {
        return request(app)
            .get('/api/video-games')
            .then(retrievedGames => {
                createdGames.forEach(createdGames => {
                    expect(retrievedGames.body).toContainEqual(createdGames);
                });
            });
    });

    it('gets a game by id', () => {
        return request(app)
            .get(`/api/video-games/${createdGames[0]._id}`)
            .then(res => {
                expect(res.body).toEqual(createdGames[0]);
            });
    });

    it('finds game with query search', () => {
        return request(app)
            .post('/api/video-games')
            .send({
                title: 'Street Fighter',
                system: 'Arcade',
                genre: 'Fighting'
            })
            .then(() => {
                return request(app)
                    .get('/api/video-games')
                    .query({ title: 'Street Fighter' })
                    .then(res => {
                        expect(res.body[0]).toEqual({
                            _id: expect.any(String),
                            __v: expect.any(Number),
                            title: 'Street Fighter',
                            system: 'Arcade',
                            genre: 'Fighting',
                            completed: false
                        });
                    });
            });
    });

    it('deletes a game', () => {
        return request(app)
            .delete(`/api/video-games/${createdGames[0]._id}`)
            .then(res => {
                expect(res.body).toEqual({ removed: true });
            });
    });

    it('fails to delete a non-existant game', () => {
        return request(app)
            .delete('/api/video-games/507f1f77bcf86cd799439011')
            .then(res => {
                expect(res.body).toEqual({ removed: false });
            });
    });

    it('updates a game', () => {
        return request(app)
            .put(`/api/video-games/${createdGames[5]._id}`)
            .send({ 
                title: 'Super Mario World',
                system: 'Nintendo',
                genre: 'Platformer' 
            })
            .then(res => {
                expect(res.body).toEqual({
                    _id: expect.any(String),
                    __v: expect.any(Number),
                    title: 'Super Mario World',
                    system: 'Nintendo',
                    genre: 'Platformer',
                    completed: false
                });
            });
    });
});

