const jwtDecode = require('jwt-decode');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
/*
    token - your token
    info - information that you want get
*/
const getCustomerInfo = (token, info) => {
    const clearToken = token.split(' ')[1];
    const decoded = jwtDecode(clearToken);
    return decoded[info]
};

const validatePassword = (password, hash) => {
    const newHash = crypto.pbkdf2Sync(password, process.env.SALT_ROUNDS, 10000, 512, 'sha512').toString('hex');
    return hash === newHash;
};

const generToken = (customer) => {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);
    const token = jwt.sign({
        email: customer.email,
        uuid: customer.uuid,
        exp: parseInt(expirationDate.getTime() / 1000, 10),
    }, process.env.JWT_SECRET);
    return token
};

module.exports = {
    getCustomerInfo,
    validatePassword,
    generToken
};
