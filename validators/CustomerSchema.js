const Joi = require('joi');

const LoginSchema = Joi.object().keys({
    password: Joi.string().required(),
    email: Joi.string().email().required()
});

const RegisterSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

module.exports = {
    login: LoginSchema,
    register: RegisterSchema
};
