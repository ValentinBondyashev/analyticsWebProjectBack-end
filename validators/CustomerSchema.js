const Joi = require('joi');

const LoginSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
});

const RegisterSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
});

module.exports = {
    login: LoginSchema,
    register: RegisterSchema
};
