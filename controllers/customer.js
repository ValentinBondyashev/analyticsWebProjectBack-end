const Joi = require('joi');
const passport = require('passport');
const uuidv1 = require('uuid/v1');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const db = require('../models');
const Customer = db.customers;
const { CustomerSchema } = require('../validators');
const { CustomerServices } = require('../services');

async function register (req, res) {
    try{
        const { body: { customer } } = req;
        Joi.validate(customer, CustomerSchema.register, async (err, data) => {
            try {
                if (!err) {
                    const hash = crypto.pbkdf2Sync(data.password, process.env.SALT_ROUNDS, 10000, 512, 'sha512').toString('hex');
                    const uuid = uuidv1();

                    const refreshToken = jwt.sign({
                        uuid: uuid,
                    }, process.env.JWT_SECRET_REFRESH, { expiresIn: process.env.REFRESH_TOKEN_LIFE});

                    const newCustomer = {
                        uuid: uuid,
                        hash: hash,
                        email: customer.email,
                        refreshToken: refreshToken
                    };

                    const finalCustomer = await Customer.create(newCustomer);
                    const accessToken = jwt.sign({
                        email: finalCustomer.email,
                        uuid: finalCustomer.uuid,
                    }, process.env.JWT_SECRET, { expiresIn: process.env.TOKEN_LIFE});

                    res.json({accessToken: accessToken, refreshToken: finalCustomer.refreshToken});
                } else {
                    res.status(400).send(err);
                }
            } catch (err) {
                res.status(400).json( err.errors[0].message );
            }
        });
    }
    catch (err) {
        res.status(400).json({message: "Error", details: err});
    }
}

async function login(req, res, next) {
    try {
        const {body: {customer}} = req;
        Joi.validate(customer, CustomerSchema.login, async (err) => {
            try {
                if (err) {
                    res.status(400);
                    res.send(err);
                } else {
                    passport.authenticate('local', {session: false}, async (err, passportUser) => {
                        if (err) {
                            return next(err);
                        }
                        if(!passportUser){
                            res.send({ success : false, message : 'authentication failed' });
                        }
                        if (passportUser) {
                            const accessToken = jwt.sign({
                                email: passportUser.email,
                                uuid: passportUser.uuid,
                            }, process.env.JWT_SECRET, { expiresIn: process.env.TOKEN_LIFE});

                            const refreshToken = jwt.sign({
                                uuid: passportUser.uuid,
                            }, process.env.JWT_SECRET_REFRESH, { expiresIn: process.env.REFRESH_TOKEN_LIFE});

                            await Customer.update({ refreshToken: refreshToken},{ where: {uuid : passportUser.uuid} });

                            return res.json({accessToken: accessToken, refreshToken: refreshToken});
                        }
                    })(req, res);
                }
            } catch (err) {
                res.status(400).json(err);
            }
        });
    } catch ( err ) {
        res.status(400).json({message: "Error", details: err});
    }
}

async function refreshToken ( req, res ) {
    try {
        const { refreshToken } = req.body;
        const decoded = CustomerServices.getCustomerInfo(refreshToken, 'all');
        const customer = await Customer.findOne({ where: { uuid: decoded.uuid } });
        const expirationDate = new Date(decoded.exp * 1000);
        if(refreshToken === customer.refreshToken){
            if(expirationDate < new Date()){
                res.status(400).json({error: 'You need re-login'})
            }
            const newRefreshToken = jwt.sign({
                uuid: customer.uuid,
            }, process.env.JWT_SECRET_REFRESH, { expiresIn: process.env.REFRESH_TOKEN_LIFE});

            const newAccessToken = jwt.sign({
                email: customer.email,
                uuid: customer.uuid,
            }, process.env.JWT_SECRET, { expiresIn: process.env.TOKEN_LIFE});

            await Customer.update({ refreshToken: newRefreshToken},{ where: {refreshToken : refreshToken} });
            res.json({refreshToken: newRefreshToken, accessToken: newAccessToken});
        }else{
            res.status(400).json({error: 'Refresh token is incorrect. Please re-login.'})
        }
    } catch (err) {
        res.status(400).json({error: err})
    }
}

module.exports = {
    register,
    login,
    refreshToken
};
