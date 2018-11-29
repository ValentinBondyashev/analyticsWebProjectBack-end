process.env.NODE_ENV = 'test';
const { CustomerServices } = require('../services');
const uuidv1 = require('uuid/v1');
const db = require('../models');
const Events = db.events;

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);

describe('Events', () => {
    describe('/POST attach events', () => {
        it('it should POST attach events', (done) => {
            db.customers.findOne({where: { email: 'test@test.test' }}).then((customer) => {
                const uuidSite ='1947f570-f24d-11e8-987a-41b3983474c5';
                const uuidCustomer = customer.dataValues.uuid;
                const site = {
                    uuid: uuidSite,
                    customerUuid: uuidCustomer,
                    address: 'test1.com'
                };
                db.sites.create(site).then((site) => {
                    const body = {
                        "site": {
                            "uuid": site.dataValues.uuid,
                            "events": ["clicks", "inputs"]
                        }
                    };
                    chai.request(server)
                        .post('/api/events/attach')
                        .set('Authorization', 'Token '+ CustomerServices.generToken(customer.dataValues))
                        .send(body)
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('object');
                            res.body.should.have.property('success').eql(true);
                            done();
                        })
                });
            });
        });
    });

    describe('/GET get all actions but this site has not events', () => {
        it('it should GET all actions but this site has not events', (done) => {
            db.customers.findOne({where: { email: 'test@test.test'}}).then((customer) => {
                chai.request(server)
                    .get('/api/events/all/123test123')
                    .set('Authorization', 'Token ' + CustomerServices.generToken(customer.dataValues))
                    .end((err, res) => {
                        res.should.have.status(400);
                        res.body.should.be.a('object');
                        res.body.should.have.property('error').equal('no events exist');
                        done();
                    })
            });

        });
    });

    describe('/POST add events', () => {
        it('it should POST events', (done) => {
            db.customers.findOne({where: { email: 'test@test.test'}}).then((customer) => {
                const body = {
                    "clicks" : [
                        {
                            "time": 1542629670935,
                            "sessionId": "1542629669143",
                            "localName": "p",
                            "innerText": "footer works!"
                        },
                    ],
                    "inputs": [
                        {
                            "time": 1542629670935,
                            "sessionId": "1542629669143",
                            "className": "p",
                            "localName": "12we12e12s",
                            "targetValue": "footer works!",
                            "targetId": "1212s"
                        }]
                };
                chai.request(server)
                    .post('/api/events/add')
                    .set('Origin', 'test1.com')
                    .set('Authorization', 'Token ' + CustomerServices.generToken(customer.dataValues))
                    .send(body)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('success').eql(true);
                        done();
                    })
            });
        });
    });


    describe('/GET get all actions', () => {
        it('it should GET all actions', (done) => {
            db.sites.findOne({where: {address: 'test1.com'}})
                .then((site) =>{
                    db.customers.findOne({where: { email: 'test@test.test'}})
                        .then((customer) => {
                            chai.request(server)
                                .get('/api/events/all/' + site.dataValues.uuid)
                                .set('Authorization', 'Token ' + CustomerServices.generToken(customer.dataValues))
                                .end((err, res) => {
                                    res.should.have.status(200);
                                    res.body.should.be.a('object');
                                    res.body.should.have.property('allEvents');
                                    done();
                                })
                        });
                });
        });
    });

    describe('/GET get all actions by type', () => {
        it('it should GET all actions by type', (done) => {
            db.sites.findOne({where: {address: 'test1.com'}})
                .then((site) =>{
                    db.customers.findOne({where: { email: 'test@test.test'}})
                        .then((customer) => {
                            chai.request(server)
                                .get('/api/events/clicks/' + site.dataValues.uuid)
                                .set('Authorization', 'Token ' + CustomerServices.generToken(customer.dataValues))
                                .end((err, res) => {
                                    res.should.have.status(200);
                                    res.body.should.be.a('object');
                                    res.body.should.have.property('clicks');
                                    done();
                                })
                        });
                });
        });
    });

    describe('/GET all attached events', () => {
        it('it should GET all attached events', (done) => {
            db.sites.findOne({where: {address: 'test1.com'}})
                .then((site) =>{
                    db.customers.findOne({where: { email: 'test@test.test'}})
                        .then((customer) => {
                            chai.request(server)
                                .get('/api/events/attach/' + site.dataValues.uuid)
                                .set('Authorization', 'Token ' + CustomerServices.generToken(customer.dataValues))
                                .end((err, res) => {
                                    res.should.have.status(200);
                                    res.body.should.be.a('object');
                                    res.body.should.have.property('events');
                                    done();
                                })
                        });
                });
        });
    });

    describe('/GET all events type', () => {
        it('it should GET  all events type', (done) => {
            chai.request(server)
                .get('/api/events/allTypes')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });
});

