const jwt = require('express-jwt');
const jwtDecode = require('jwt-decode');

const getTokenFromHeaders = (req) => {
    const { headers: { authorization } } = req;

    if(authorization && authorization.split(' ')[0] === 'Token') {
        return authorization.split(' ')[1];
    }
    return null;
};

const tokenCheck = async (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (token) {
        const decode = jwtDecode(token);
        const expirationDate = new Date(decode.exp * 1000);
        if(expirationDate < new Date()){
            return res.status(401).send({
                "error": true,
                "message": 'your access token is rotten'
            });
        }
        next()
    } else {
        return res.status(403).send({
            "error": true,
            "message": 'No token provided.'
        });
    }
};

const auth = {
    required: jwt({
        secret: 'secret',
        userProperty: 'payload',
        getToken: getTokenFromHeaders,
    }),
    optional: jwt({
        secret: 'secret',
        userProperty: 'payload',
        getToken: getTokenFromHeaders,
        credentialsRequired: false,
    }),
    tokenCheck : tokenCheck
};

module.exports = auth;
