process.env.NODE_ENV = 'test';

const uuidv1 = require('uuid/v1');
const db = require('../models');
const Customers = db.customers;

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);

describe('========= ** Routes ** =========', () => {
    describe('/POST routes', () => {
        it('it should POST add routes', (done) => {
            const body = {
                oldUrl: 'localhost/1',
                newUrl: 'localhost/2',
                sessionId: '12342356'
            };
            chai.request(server)
                .post('/api/routes/add')
                .send(body)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('createdRoute');
                    done();
                })
        });
    });

    describe('/GET routes', () => {
        it('it should GET get all routes', (done) => {
            db.sites.findOne({where: {address: 'test1.com'}})
                .then((site) => {
                    chai.request(server)
                        .get('/api/routes/all/' + site.uuid)
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('object');
                            res.body.should.have.property('allRoutes');
                            done();
                        })
                }).catch(done);
        });
    });
});
