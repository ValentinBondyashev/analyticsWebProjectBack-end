const uuidv1 = require('uuid/v1');
const { CustomerServices } = require('../services');

const db = require('../models/index');
const Users = db.users;
const Events = db.events;
const Sites = db.sites;

async function addEvents (req, res) {
    try{
        const { body } = req;
        const site = await Sites.find({where : {address : req.get('origin')} });
        const siteUuid = site.dataValues.uuid;
        for(let key in body ){
            body[key].map(async event => {
                try {
                    const user = await Users.findOne({ where : { sessionId: event.sessionId }});
                    if(!user) {
                        await Users.create({ uuid: uuidv1(), sessionId : event.sessionId });
                    }
                    if(db[key]){
                        await db[key].create({ uuid: uuidv1(), sessionId: event.sessionId , siteUuid: siteUuid, ...event });
                    }
                    res.json({success: true});
                } catch (err) {
                    res.status(404).json({error: err});
                }
            });
        }
    }
    catch (err) {
        res.status(400).json({message: "Error", details: err});
    }
}

async function attachEvents ( req, res ) {
    try {
        const { body : { site } } = req;
        const { headers: { authorization } } = req;
        const customerUuid = CustomerServices.getCustomerInfo(authorization, 'uuid');
        site.events.map( async event => {
            try {
                const newEvent = {
                    uuid: uuidv1(),
                    customerUuid: customerUuid,
                    siteUuid: site.uuid,
                    typeEvent: event
                };
                const availableEvent = await Events.findOne({ where: { customerUuid: customerUuid, siteUuid: site.uuid, typeEvent: event }});
                if(!availableEvent){
                    await Events.create(newEvent);
                    res.json({ success: true });
                }else{
                    res.json({ success: true });
                }
            } catch (err) {
                res.status(404).json({error: err});
            }
        });
    } catch (err) {
        res.status(400).json({error: err})
    }
}

async function deleteAttachEvents ( req, res ) {
    try {
        const { body : { siteUuid, events } } = req;
        const { headers: { authorization } } = req;
        const customerUuid = CustomerServices.getCustomerInfo(authorization, 'uuid');
        events.map(async (event) => {
           try {
               const deletedEvent = await Events.destroy({ where: { customerUuid: customerUuid, siteUuid: siteUuid, typeEvent: event }});
               res.json({success: Boolean(Number(deletedEvent))});
           } catch( err ){
               res.status(404).json({error: err});
           }
        });

    } catch (err) {
        res.status(400).json({error: err})
    }
}

async function getActions ( req, res ) {
    try{
        const { params : { site } } = req;
        const { params : { filter } } = req;
        const { headers: { authorization } } = req;
        const customerUuid = CustomerServices.getCustomerInfo(authorization, 'uuid');
        const events = await Events.findAll({ where: { siteUuid: site,  customerUuid: customerUuid }});
        if(events.length){
            let allEvents = {};
            await Promise.all(
                events.map( async event => {
                    try {
                        const type = event.dataValues.typeEvent;
                        let data;
                        if(filter){
                            data = await db[type].findAll({ where : { siteUuid: site }, order: db.sequelize.literal(filter)});
                        }else {
                            data = await db[type].findAll({ where : { siteUuid: site }});
                        }
                        allEvents[type] = data;
                    } catch (err) {
                        res.status(404).json({error: err});
                    }
                })
            );

            res.json(allEvents)
        } else{
            res.status(404).json({error: 'no events exist'});
        }
    } catch (err) {
        res.status(400).json({ error: err })
    }
}

async function getAttachedEvents (req, res) {
    try{
        const { params : { site } } = req;
        const { headers: { authorization } } = req;
        const customerUuid = CustomerServices.getCustomerInfo(authorization, 'uuid');
        const events = await Events.findAll({ where: { siteUuid: site,  customerUuid: customerUuid }});
        let result = [];
        events.map( event => {
            result.push(event.dataValues.typeEvent);
        });
        res.json({events: result})
    } catch (err) {
        res.status(400).json({error: err});
    }
}

async function getEvents (req, res) {
    try{
        const { params : { site } } = req;
        const { headers: { authorization } } = req;
        const customerUuid = CustomerServices.getCustomerInfo(authorization, 'uuid');
        const events = await Events.findAll({ where: { customerUuid: customerUuid, siteUuid: site }});
        if(events.length){
            events.map( async event => {
                try {
                    const type = event.dataValues.typeEvent;
                    if(type === req.params.event){
                        const data = await db[type].findAll({ where: { siteUuid: site }} );
                        const result = {};
                        result[event.dataValues.typeEvent] = data;
                        res.json(result);
                    }
                } catch (err) {
                    res.status(404).json({error: err});
                }
            });
        }else{
            res.status(404).json({error: 'events with that type no exist'});
        }
    } catch (err) {
        res.status(400).json({error: err})
    }
}

async function getAllTypes (req, res) {
    const typeEvents = ['clicks', 'inputs'];
    res.json(typeEvents);
}

module.exports = {
    addEvents,
    attachEvents,
    getAttachedEvents,
    getActions,
    getEvents,
    getAllTypes,
    deleteAttachEvents
};
