require('dotenv').config();
require('../lib/mongoose-connector')();
const mongoose = require('mongoose');
const Game = require('../lib/models/Game');
const request = require('supertest');
const app = require('../lib/app');

describe('game pub/sub API', () => {

    let seedGames = [
        { title: 'Blokus', mechanics: { numPlayers: 4, minutesPerGame: 30 }, type: 'strategy' },
        { title: 'Settlers of Catan', mechanics: { numPlayers: 4, minutesPerGame: 60 }, type: 'communication' },
        { title: 'Chess', mechanics: { numPlayers: 2, minutesPerGame: 90 }, type: 'dexterity' }
    ];

    let createdGames;

    const makeGame = game => {
        return request(app)
            .post('/games')
            .send(game)
            .then(res => res.body);
    };

    beforeEach(() => {
        return Game.deleteMany();
    });

    beforeEach(() => {
        return Promise.all(seedGames.map(makeGame)).then(gamesRes => {
            createdGames = gamesRes;
        });
    });

    afterAll(() => {
        mongoose.disconnect();
    });

    it('creates a game on post', () => {
        const newGame =  { title: 'Haunting', mechanics: { numPlayers: 6, minutesPerGame: 60 }, type: 'role-playing' };
        return request(app)
            .post('/games')
            .send(newGame)
            .then(res => {
                expect(res.body).toEqual({
                    __v: expect.any(Number),
                    _id: expect.any(String),
                    ...newGame
                });
            });
    });

    it('gets all games on get', () => {
        return request(app)
            .get('/games')
            .then(retrievedGames => {
                createdGames.forEach(createdGame => {
                    expect(retrievedGames.body).toContainEqual(createdGame);
                });
            });
    });

    it('gets a game by id', () => {
        return request(app)
            .get(`/games/${createdGames[0]._id}`)
            .then(res => {
                expect(res.body).toEqual(createdGames[0]);
            });
    });

    it('deletes a game by id', () => {
        return request(app)
            .delete(`/games/${createdGames[0]._id}`)
            .then (() => request(app).get(`/games/${createdGames[0]._id}`))
            .then(res => {
                expect(res.body).toEqual(null);
            });
    });

    it('updates a game by id', () => {
        const newGameData = { title: 'Settlers of Catan', mechanics: { numPlayers: 6, minutesPerGame: 30 }, type: 'communication' };
        return request(app)
            .put(`/games/${createdGames[1]._id}`)
            .send(newGameData)
            .then(res => {
                expect(res.body).toEqual({
                    __v: expect.any(Number),
                    _id: expect.any(String),
                    ...newGameData
                });
            });
    });

});