const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('./../models/index');
const Customer = db.customer;

passport.use(new LocalStrategy({
    usernameField: 'customer[email]',
    passwordField: 'customer[password]',
}, (email, password, done) => {
    Customer.findOne({ options :{email : email} })
        .then((customer) => {
            if(!customer || !customer.validatePassword(password)) {
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
