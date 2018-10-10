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
            system: chance.guid({ version: 4 }),
            genre: chance.guid({ version: 4 })
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
                    genre: 'Fighting'
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
    
    it('deletes a game', () => {
        return request(app)
            .delete(`/api/video-games/${createdGames[0]._id}`)
            .then(deletedGame => {
                return request(app)
                    .get(`/api/video-games/${deletedGame.body._id}`);
            })
            .then(res => {
                expect(res.body).toBeNull();
            });
    });
});

