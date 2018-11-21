const Joi = require('joi');
const passport = require('passport');
const uuidv1 = require('uuid/v1');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const db = require('../models');
const Customer = db.customers;
const { CustomerSchema } = require('../validators');

async function register (req, res) {
    try{
        const { body: { customer } } = req;
        Joi.validate(customer, CustomerSchema.register, async (err, data) => {
            if(!err){
                const hash = crypto.pbkdf2Sync(data.password, process.env.SALT_ROUNDS, 10000, 512, 'sha512').toString('hex');
                const newCustomer = {
                    uuid: uuidv1(),
                    hash: hash,
                    email: customer.email
                };
                const finalCustomer = await Customer.create(newCustomer);

                const today = new Date();
                const expirationDate = new Date(today);
                expirationDate.setDate(today.getDate() + 60);

                const token = jwt.sign({
                    email: finalCustomer.email,
                    id: finalCustomer.id,
                    exp: parseInt(expirationDate.getTime() / 1000, 10),
                }, process.env.JWT_SECRET);

                return res.json({token: token});
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
            res.status(400);
            res.send(err);
        }else{
            passport.authenticate('local', { session: false }, (err, passportUser) => {
                if(err) {
                    return next(err);
                }
                if(passportUser) {
                    const today = new Date();
                    const expirationDate = new Date(today);
                    expirationDate.setDate(today.getDate() + 60);

                    const token = jwt.sign({
                        email: passportUser.email,
                        id: passportUser.id,
                        exp: parseInt(expirationDate.getTime() / 1000, 10),
                    }, process.env.JWT_SECRET);
                    return res.json({token: token});
                }
                return res.status(400);
            })(req, res);
        }
    });
}

module.exports = {
    register,
    login,
};
