const Joi = require('joi');
const passport = require('passport');

const db = require('../config/db.config.js');
const Customer = db.customer;
const { CustomerSchema } = require('../validators');

async function register (req, res) {
    try{
        const { body: { customer } } = req;
        Joi.validate(customer, CustomerSchema.register, async (err, data) => {
            if(!err){
                const newCustomer = new Customer(data);
                newCustomer.setPassword(customer.password);
                const finalCustomer = await Customer.create(newCustomer.dataValues);
                return res.json({customer: finalCustomer.toAuthJSON()});
            }else {
                res.status(400);
                res.send(err);
            }
        });
    }
    catch (err) {
        return res.status(500).json({message: "Error", details: err});
    }
}

async function login(req, res, next) {
    const { body: {customer} } = req;

    Joi.validate(customer, CustomerSchema.login, async(err) => {
        if(err){
            return res.status(400);
        }else{
            passport.authenticate('local', { session: false }, (err, passportUser) => {
                if(err) {
                    return next(err);
                }
                if(passportUser) {
                    const newCustomer = new Customer(passportUser);
                    return res.json(newCustomer.toAuthJSON());
                }
                return status(400).info;
            })(req, res);
        }
    });
}

module.exports = {
    register,
    login,
};
