const { CustomerServices } = require('../services');
const db = require('../models/index');
const Sites = db.sites;

async function addSite (req, res) {
    try{
        const { body: { site } } = req;
        const { headers: { authorization } } = req;
        const uuid = CustomerServices.getCustomerInfo(authorization, 'uuid');
        const newSite = {
            customerUuid: uuid,
            address: site
        };
        const data = await Sites.create(newSite);
        try{

        }
        catch (err){
            res.status(500).json({ error : uuid })
        }
        return res.json({site: data});
    }
    catch (err) {
        return res.status(500).json({message: "Error", details: err});
    }
}

async function getSites (req, res) {
    try{
        const { headers: { authorization } } = req;
        const uuid = CustomerServices.getCustomerInfo(authorization, 'uuid');
        const sites = await Sites.findAll({ customerUuid : uuid });
        return res.json({site: sites});
    }
    catch (err) {
        return res.status(500).json({message: "Error", details: err});
    }
}

module.exports = {
    addSite,
    getSites
};
