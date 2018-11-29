process.env.NODE_ENV = 'test';
const db = require('../models');
const Sites = db.sites;
const { CustomerServices } = require('../services');

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
            db.customers.findOne({where: { email: 'test@test.test'}}).then((customer) => {
                chai.request(server)
                    .get('/api/sites/')
                    .set('Authorization', 'Token ' + CustomerServices.generToken(customer.dataValues))
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('site');
                        done();
                    });
            });
        });
    });
    describe('/POST add site', () => {
        it('it should POST add site', (done) => {
            const body = {
                "site": "test.com"
            };
            db.customers.findOne({where: { email: 'test@test.test'}}).then((customer) => {
                chai.request(server)
                    .post('/api/sites/add')
                    .send(body)
                    .set('Authorization', 'Token '+ CustomerServices.generToken(customer.dataValues))
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('site');
                        done();
                    })
            });
        });
    });

    describe('/PUT change address', () => {
        it('it should PUT change address', (done) => {
            db.sites.findOne({where: {address : 'test.com'}})
                .then((site) => {
                    const body = {
                        "uuid" : site.dataValues.uuid,
                        "address": "test.com"
                    };
                    db.customers.findOne({where: { email: 'test@test.test'}}).then((customer) => {
                        chai.request(server)
                            .put('/api/sites/edit')
                            .send(body)
                            .set('Authorization', 'Token '+ CustomerServices.generToken(customer.dataValues))
                            .end((err, res) => {
                                res.should.have.status(200);
                                res.body.should.be.a('object');
                                res.body.should.have.property('success').equal(true);
                                done();
                            })
                    });
                });

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
            db.customers.findOne({where: { email: 'test@test.test'}}).then((customer) => {
                const uuidSite ='1947f570-f24d-11e8-987a-41b3983474c5';
                const uuidCustomer = customer.dataValues.uuid;
                const site = {
                    uuid: uuidSite,
                    customerUuid: uuidCustomer,
                    address: 'test.com'
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

});


