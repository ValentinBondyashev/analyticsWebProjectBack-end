process.env.NODE_ENV = 'test';

const uuidv1 = require('uuid/v1');
const db = require('../models');
const Events = db.events;

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);

describe('Events', () => {
    describe('/GET get all actions', () => {
        it('it should GET all actions', (done) => {
            chai.request(server)
                .get('/api/events/all/'+'387f7090-f233-11e8-9d46-fd9e1585c00c')
                .set('Authorization', 'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZhbGlrNkBnbWFpbC5jb20iLCJ1dWlkIjoiNWRhOGUwMzAtZWRhNy0xMWU4LTg3YWUtZDVkYjQ2MGVkODY0IiwiZXhwIjoxNTQ4MDAwMzcyLCJpYXQiOjE1NDI4MTYzNzJ9.AxDPOl4NJ-VqowyPheMnUV6EHX8wMikexnlrYeKkoYA')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('allEvents');
                    done();
                })
        });
    });

});
