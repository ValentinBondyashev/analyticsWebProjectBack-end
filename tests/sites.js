process.env.NODE_ENV = 'test';
const uuidv1 = require('uuid/v1');
const db = require('../models');
const Sites = db.sites;

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);

describe('Sites', () => {
    describe('/GET sites', () => {
        beforeEach((done) => {
            Sites.destroy({
                where: {},
                truncate: true
            });
            done();
        });
        it('it should GET all the sites', (done) => {
            chai.request(server)
                .get('/api/sites/')
                .set('Authorization', 'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZhbGlrNkBnbWFpbC5jb20iLCJ1dWlkIjoiNWRhOGUwMzAtZWRhNy0xMWU4LTg3YWUtZDVkYjQ2MGVkODY0IiwiZXhwIjoxNTQ4MDAwMzcyLCJpYXQiOjE1NDI4MTYzNzJ9.AxDPOl4NJ-VqowyPheMnUV6EHX8wMikexnlrYeKkoYA')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('site');
                    done();
                });
        });
    });
    describe('/POST site', () => {
        it('it should POST site', (done) => {
            const body = {
                "site": "12312e12"
            };
            chai.request(server)
                .post('/api/sites/add')
                .send(body)
                .set('Authorization', 'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZhbGlrNkBnbWFpbC5jb20iLCJ1dWlkIjoiNWRhOGUwMzAtZWRhNy0xMWU4LTg3YWUtZDVkYjQ2MGVkODY0IiwiZXhwIjoxNTQ4MDAwMzcyLCJpYXQiOjE1NDI4MTYzNzJ9.AxDPOl4NJ-VqowyPheMnUV6EHX8wMikexnlrYeKkoYA')
                .end((err, res) => {
                    res.should.have.status(200 || 400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('site');
                    done();
                })
        });
    });
    describe('/DELETE site', () => {
        it('it should DELETE site that has not', (done) => {
            chai.request(server)
                .delete('/api/sites/1947f570-f24d-11e8-987a-41b3983474c9')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('deletedSite').eql(0);
                    done();
                })
        });


        it('it should DELETE site', (done) => {
            const uuid ='1947f570-f24d-11e8-987a-41b3983474c5';
            const site = {
                uuid: uuid,
                customerUuid: '760568f0-ed76-11e8-85d8-8b87a69b00b8',
                address: 'site.com'
            };
            Sites.create(site)
                .then(
                    function(){
                        chai.request(server)
                            .delete('/api/sites/1947f570-f24d-11e8-987a-41b3983474c5')
                            .end((err, res) => {
                                res.should.have.status(200);
                                res.body.should.be.a('object');
                                res.body.should.have.property('deletedSite').eql(1);
                                done();
                            })
                    }
                );


        });

    });

});

//  "test": {
//    "username": "test",
//    "password": "test",
//    "database": "database_test",
//    "host": "127.0.0.1",
//    "port": "5430",
//    "dialect": "postgres"
//  },
