const db = require('../models/index');
const Sites = db.sites;

const checkQueryParamsOrOrigin = async ({query, origin}) => {
    let siteUuid;
    if(query){
        siteUuid = query;
    }else {
        const existingSite = await Sites.findOne({where : {address : origin} });
        siteUuid = existingSite.uuid;
    }
    return siteUuid
};

module.exports = {
    checkQueryParamsOrOrigin
};
