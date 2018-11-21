const jwtDecode = require('jwt-decode');
const crypto = require('crypto');

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

module.exports = {
    getCustomerInfo,
    validatePassword
};
