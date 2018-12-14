process.env.NODE_ENV = 'test';
const db = require('../models');
const Customers = db.customers;

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();
chai.use(chaiHttp);

describe('========= ** Customers ** =========', () => {
    describe('/POST register', () => {
        beforeEach((done) => {
            Customers.destroy({
                where: {}
            });
            done();
        });
        it('it should POST register customer', (done) => {
            const body = {
                "customer": {
                    "email" : "test@test.test",
                    "password": "test1111"
                }
            };
            chai.request(server)
                .post('/api/customer/register')
                .send(body)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('accessToken');
                    res.body.should.have.property('refreshToken');
                    done();
                })
        });
    });

    describe('/POST login', () => {
        it('it should POST login customer', (done) => {
            const body = {
                "customer": {
                    "email" : "test@test.test",
                    "password": "test1111"
                }
            };
            chai.request(server)
                .post('/api/customer/login')
                .send(body)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('accessToken');
                    res.body.should.have.property('refreshToken');
                    done();
                })
        });
    });

    describe('/POST refreshToken', () => {
        it('it should POST refreshToken', (done) => {
            db.customers.findOne({where: { email: 'test@test.test'}})
                .then((customer) => {
                    const body = {
                        "refreshToken": customer.refreshToken
                    };
                    chai.request(server)
                        .post('/api/customer/refreshToken')
                        .send(body)
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('object');
                            res.body.should.have.property('accessToken');
                            res.body.should.have.property('refreshToken');
                            done();
                        })
                }).catch(done);
        });
    });

});
