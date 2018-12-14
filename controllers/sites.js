const uuidv1 = require('uuid/v1');
const { CustomerServices } = require('../services');
const db = require('../models/index');
const Sites = db.sites;
const Customers = db.customers;
const WatcherSite = db.watcherSite;

async function addSite (req, res) {
    try{
        const { body: { site } } = req;
        const { headers: { authorization } } = req;
        const uuid = CustomerServices.getCustomerInfo({token:authorization, type:'uuid'});
        const availableSite = await Sites.findOne({
            where: { address: site },
            include: [{
                model: Customers,
                as: 'Watcher',
                required: false,
                attributes: ['uuid', 'email'],
                through: { attributes: [] }
            }]
        });
        const customer = await Customers.findOne({ where: { uuid } });
        if(!availableSite) {
            const newSite = {
                uuid: uuidv1(),
                address: site
            };
            const data = await Sites.create(newSite);
            data.setWatcher(customer);
            res.status(200).json({site: data})
        } else {
            availableSite.addWatcher(customer);
            res.status(200).json({site: availableSite})
        }
    } catch (err) {
        res.status(400).json({message: "Error", details: err});
    }
}

async function deleteSite (req, res) {
    try{
        const { params: { uuid } } = req;
        const { headers: { authorization } } = req;
        const customerUuid = CustomerServices.getCustomerInfo({token:authorization, type:'uuid'});
        const deletedSite = await WatcherSite.destroy({where: {customerId : customerUuid, siteId: uuid}});
        res.json({ deletedSite: deletedSite })
    } catch ( err ) {
        res.status(400).json({message: "Error", details: err});
    }
}

async function getSites (req, res) {
    try{
        const { headers: { authorization } } = req;
        const uuid = CustomerServices.getCustomerInfo({token:authorization, type:'uuid'});
        const sites = await Sites.findAll({ include: [{
                model: Customers,
                as: 'Watcher',
                attributes: [],
                where: {uuid: uuid}
            }]});
        res.json({site: sites});
    } catch (err) {
        res.status(400).json({message: "Error", details: err});
    }
}

async function editAddress (req, res) {
    try{
        const { body: { address, uuid } } = req;
        const { headers: { authorization } } = req;
        const customerUuid = CustomerServices.getCustomerInfo({token:authorization, type:'uuid'});
        const customer = await Customers.findOne({ where: { uuid: customerUuid } });
        await WatcherSite.destroy({where: {customerId : customerUuid, siteId: uuid}});

        const availableWatcher = await WatcherSite.findAll({where: { siteId: uuid }});
        if(!availableWatcher.length){
            await Sites.destroy({where: { uuid: uuid }})
        }

        const availableSite = await Sites.findOne({
            where: { address: address }
        });

        if(!availableSite){
            const newSite = {
                uuid: uuidv1(),
                address: address
            };
            const site = await Sites.create(newSite);
            site.setWatcher(customer);
            res.status(200).json({success: true})
        }else{
            availableSite.addWatcher(customer);
            res.status(200).json({success: true});
        }
    } catch (err) {
        res.status(400).json({message: "Error", details: err});
    }
}

module.exports = {
    addSite,
    getSites,
    deleteSite,
    editAddress
};
