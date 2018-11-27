const uuidv1 = require('uuid/v1');
const { CustomerServices } = require('../services');
const db = require('../models/index');
const Sites = db.sites;

async function addSite (req, res) {
    try{
        const { body: { site } } = req;
        const { headers: { authorization } } = req;
        const uuid = CustomerServices.getCustomerInfo(authorization, 'uuid');
        const availableSite = await Sites.findOne({ where: { customerUuid: uuid, address: site }});
        if(!availableSite) {
            const newSite = {
                uuid: uuidv1(),
                customerUuid: uuid,
                address: site
            };
            const data = await Sites.create(newSite);
            res.json({site: data});
        } else {
            res.status(400).json({error: 'this site already exists'})
        }
    } catch (err) {
        res.status(500).json({message: "Error", details: err});
    }
}

async function deleteSite (req, res) {
    try{
        const { body: { uuid } } = req;
        const deletedSite = await Sites.destroy({where:{uuid : uuid}});
        res.json({ deletedSite: deletedSite })
    } catch ( err ) {
        res.status(500).json({message: "Error", details: err});
    }
}

async function getSites (req, res) {
    try{
        const { headers: { authorization } } = req;
        const uuid = CustomerServices.getCustomerInfo(authorization, 'uuid');
        const sites = await Sites.findAll({ customerUuid : uuid });
        res.json({site: sites});
    } catch (err) {
        res.status(500).json({message: "Error", details: err});
    }
}

module.exports = {
    addSite,
    getSites,
    deleteSite
};
