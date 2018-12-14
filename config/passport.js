const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('./../models/index');
const Customer = db.customers;
const { CustomerServices } = require('../services');

passport.use(new LocalStrategy({
    usernameField: 'customer[email]',
    passwordField: 'customer[password]',
}, (email, password, done) => {
    Customer.findOne({ where :{email : email} })
        .then((customer) => {
            if(!customer || !CustomerServices.validatePassword(password,  customer.hash)) {
                return done(null, false, { errors: { 'email or password': 'is invalid' } });
            }
            return done(null, customer.dataValues);
        }).catch(done);
}));

passport.serializeUser(function(customer, cb) {
    cb(null, customer.id);
});

passport.deserializeUser(function(id, cb) {
    Customer.findById(id, function (err, customer) {
        if (err) { return cb(err); }
        cb(null, customer);
    });
});
