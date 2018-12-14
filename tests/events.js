process.env.NODE_ENV = 'test';
const { CustomerServices } = require('../services');
const db = require('../models');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');

chai.use(chaiHttp);

describe('========= ** Events ** =========', () => {
    beforeEach((done) => {
        db.clicks.destroy({
            where: {}
        });
        db.inputs.destroy({
            where: {}
        });
        db.sites.destroy({
            where: {}
        });
        done();
    });
    describe('/POST Events', () => {
        it('it should POST attach events', (done) => {
            db.customers.findOne({where: {email: 'test@test.test'}})
                .then((customer) => {
                    const uuidSite = '1947f570-f24d-11e8-987a-41b3983474c5';
                    const uuidCustomer = customer.dataValues.uuid;
                    const site = {
                        uuid: uuidSite,
                        customerUuid: uuidCustomer,
                        address: 'test1.com'
                    };
                    db.sites.create(site)
                        .then((site) => {
                            const body = {
                                "site": {
                                    "uuid": site.dataValues.uuid,
                                    "events": ["clicks", "inputs"]
                                }
                            };
                            chai.request(server)
                                .post('/api/events/attach')
                                .set('Authorization', 'Token ' + CustomerServices.generToken(customer.dataValues))
                                .send(body)
                                .end((err, res) => {
                                    res.should.have.status(200);
                                    res.body.should.be.a('object');
                                    res.body.should.have.property('success').eql(true);
                                    done();
                                })
                        }).catch(done);
                }).catch(done);
        });});

    it('it should POST add events', (done) => {
        db.customers.findOne({where: { email: 'test@test.test'}})
            .then((customer) => {
                const site = {
                    uuid: '1947f570-f24d-11e8-987a-41b3983474c5',
                    address: 'test1.com'
                };
                db.sites.create(site)
                    .then((site) => {
                        const body = {
                            "clicks" : [
                                {
                                    "time": 1542629670935,
                                    "sessionId": "1542629669143",
                                    "localName": "p",
                                    "className": "p",
                                    "parent": {
                                        "uuid": "38cd6290-fdf1-11e8-9f51-a3f44eeef008",
                                        "className": "main-menu",
                                        "isTracking": null,
                                        "innerText": "LogoAdd new site for analizeCheck statistic\nLog out\n",
                                        "tag": "div",
                                        "createdAt": "2018-12-12T09:35:11.692Z",
                                        "updatedAt": "2018-12-12T09:35:11.692Z"
                                    },
                                    "innerText": "footer works!"
                                },
                            ],
                            "inputs": [
                                {
                                    "time": 1542629670935,
                                    "sessionId": "1542629669143",
                                    "className": "p",
                                    "localName": "12we12e12s",
                                    "parent": {
                                        "uuid": "38cd6290-fdf1-11e8-9f51-a3f44eeef008",
                                        "className": "main-menu",
                                        "isTracking": null,
                                        "innerText": "LogoAdd new site for analizeCheck statistic\nLog out\n",
                                        "tag": "div",
                                        "createdAt": "2018-12-12T09:35:11.692Z",
                                        "updatedAt": "2018-12-12T09:35:11.692Z"
                                    },
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
                    }).catch(done);
            }).catch(done);
    });
});

describe('/GET Events', () => {

    it('it should GET all actions', (done) => {
                db.customers.findOne({where: { email: 'test@test.test'}})
                    .then((customer) => {
                        chai.request(server)
                            .get('/api/events/all/')
                            .set('Origin', 'test1.com')
                            .set('Authorization', 'Token ' + CustomerServices.generToken(customer.dataValues))
                            .end((err, res) => {
                                res.should.have.status(200);
                                res.body.should.be.a('object');
                                res.body.should.have.property('clicks');
                                res.body.should.have.property('inputs');
                                done();
                            })
                    }).catch(done);
    });

    it('it should GET all actions by type', (done) => {
        db.customers.findOne({where: { email: 'test@test.test'}})
            .then((customer) => {
                chai.request(server)
                    .get('/api/events/get/clicks/')
                    .set('Origin', 'test1.com')
                    .set('Authorization', 'Token ' + CustomerServices.generToken(customer.dataValues))
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('clicks');
                        done();
                    })
            }).catch(done);

    });

    it('it should GET sort clicks', (done) => {
        db.customers.findOne({where: { email: 'test@test.test'}})
            .then((customer) => {
                chai.request(server)
                    .get('/api/events/clicks/sort/')
                    .set('Origin', 'test1.com')
                    .set('Authorization', 'Token ' + CustomerServices.generToken(customer.dataValues))
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('array');
                        done();
                    })
            }).catch(done);
    });

    it('it should GET all attached events', (done) => {
        db.customers.findOne({where: { email: 'test@test.test'}})
            .then((customer) => {
                chai.request(server)
                    .get('/api/events/attach/')
                    .set('Origin', 'test1.com')
                    .set('Authorization', 'Token ' + CustomerServices.generToken(customer.dataValues))
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('events');
                        done();
                    })
            }).catch(done);
    });

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


describe('/DELETE Events', () => {
    it('it should DELETE delete attach events', (done) => {
        db.customers.findOne({where: { email: 'test@test.test'}})
            .then((customer) => {
                db.sites.findOne({where: {address: 'test1.com'}})
                    .then((site) => {
                        const body = {
                            "siteUuid": site.dataValues.uuid,
                            "events": ["inputs", "clicks"]
                        };
                        chai.request(server)
                            .delete('/api/events/deleteAttach')
                            .set('Authorization', 'Token ' + CustomerServices.generToken(customer.dataValues))
                            .send(body)
                            .end((err, res) => {
                                res.should.have.status(200);
                                res.body.should.be.a('object');
                                res.body.should.have.property('success').eql(true);
                                done();
                            })
                    }).catch(done);

            }).catch(done);
    });
});

