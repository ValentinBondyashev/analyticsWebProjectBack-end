const jwtDecode = require('jwt-decode');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

/*
    token - your token
    info - information that you want get
*/
const getCustomerInfo = (token, info) => {
    const clearToken = token.split(' ')[1];
    const decoded = jwtDecode(clearToken || token);
    if(info === 'all'){
        return decoded
    }
    return decoded[info]
};

const validatePassword = (password, hash) => {
    const newHash = crypto.pbkdf2Sync(password, process.env.SALT_ROUNDS, 10000, 512, 'sha512').toString('hex');
    return hash === newHash;
};

const generToken = (customer) => {
    const token = jwt.sign({
        email: customer.email,
        uuid: customer.uuid,
    }, process.env.JWT_SECRET);
    return token
};

module.exports = {
    getCustomerInfo,
    validatePassword,
    generToken
};
