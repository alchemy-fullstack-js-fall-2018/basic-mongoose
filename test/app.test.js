require('dotenv').config();
require('../lib/mongoose-connector')();
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../lib/app');
const Celeb = require('../lib/models/Celeb');

describe('celebs', () => {

    const celebs = [
        { name: 'Barack Obama', 
            job: 'President',
            facts: {
                hobbies: 'being president',
                age: 57
            },
            known: ['for a good sense of humor', 'passing obamacare'] 
        },
        { name: 'Pele', 
            job: 'Soccer Star',
            facts: {
                hobbies: 'being awesome',
                age: 77
            },
            known: ['for being good at soccer', 'loving soccer']
        }
    ];
    
    let createdCelebs;

    const creator = celeb => {
        return request(app).post('/api/celebs')
            .send(celeb);
    };

    beforeEach(() => {
        return Celeb.deleteMany();
    });

    beforeEach(() => {
        return Promise.all(celebs.map(creator))
            .then(cs => {
                createdCelebs = cs.map(c => c.body);
            });
    });

    afterAll(() => {
        mongoose.disconnect();
    });
});
