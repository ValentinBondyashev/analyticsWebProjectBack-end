const jwtDecode = require('jwt-decode');

/*
    token - your token
    info - information that you want get
*/
function getCustomerInfo (token, info) {
    const clearToken = token.split(' ')[1];
    const decoded = jwtDecode(clearToken);
    return decoded[info]
}

module.exports = {
    getCustomerInfo
};
