const { CustomerServices } = require('../services');
const db = require('../models/index');
const Sites = db.sites;

async function addSite (req, res) {
    try{
        const { body: { site } } = req;
        const { headers: { authorization } } = req;
        const uuid = CustomerServices.getCustomerInfo(authorization, 'uuid');
        const newSite = {
            uuid: uuidv1(),
            customerUuid: uuid,
            address: site
        };
        const data = await Sites.create(newSite);
        return res.json({site: data});
    } catch (err) {
        return res.status(500).json({message: "Error", details: err});
    }
}

async function deleteSite (req, res) {
    try{
        const { body: { id } } = req;
        const deletedSite = await Sites.destroy({where:{id : id}});
        return res.json({ deletedSite: deletedSite })
    } catch ( err ) {
        return res.status(500).json({message: "Error", details: err});
    }
}

async function getSites (req, res) {
    try{
        const { headers: { authorization } } = req;
        const uuid = CustomerServices.getCustomerInfo(authorization, 'uuid');
        const sites = await Sites.findAll({ customerUuid : uuid });
        return res.json({site: sites});
    } catch (err) {
        return res.status(500).json({message: "Error", details: err});
    }
}

module.exports = {
    addSite,
    getSites,
    deleteSite
};
