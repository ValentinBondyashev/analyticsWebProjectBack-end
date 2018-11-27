const uuidv1 = require('uuid/v1');
const { CustomerServices } = require('../services');

const db = require('../models/index');
const Clicks = db.clicks;
const Users = db.users;
const Inputs = db.inputs;
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
                    const user = await Users.findOne({where : {sessionId: event.sessionId}});
                    if(!user) {
                        await Users.create({ uuid: uuidv1(), sessionId : event.sessionId });
                    }
                    if(db[key]){
                        await db[key].create({ uuid: uuidv1(), sessionId: event.sessionId , siteUuid: siteUuid, ...event });
                    }
                    res.json({success: true});
                } catch (err) {
                    res.status(400).json({error: err});
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
                const availableEvent = await Events.findOne({ where: { customerUuid: customerUuid, siteUuid: site.uuid, typeEvent: event}});
                if(!availableEvent){
                    await Events.create(newEvent);
                    res.json({ success: true });
                }else{
                    res.json({ success: true });
                }
            } catch (err) {
                res.status(400).json({error: err});
            }
        });
    } catch (err) {
        res.status(400).json({error: err})
    }
}

async function getActions ( req, res ) {
    try{
        const { params : { site } } = req;
        const { headers: { authorization } } = req;
        const customerUuid = CustomerServices.getCustomerInfo(authorization, 'uuid');
        const events = await Events.findAll({ where: { customerUuid: customerUuid, siteUuid: site }});
        events.map( async event => {
            try {
                const type = event.dataValues.typeEvent;
                const data = await db[type].findAll({ where : { siteUuid: site }});
                res.json({allEvents: data});
            } catch (err) {
                res.status(400).json({error: err});
            }
        });
    } catch (err) {
        res.status(400).json({error: err})
    }
}


async function getEvents (req, res) {
    try{
        const { params : { site } } = req;
        const { headers: { authorization } } = req;
        const customerUuid = CustomerServices.getCustomerInfo(authorization, 'uuid');
        const events = await Events.findAll({ where: { customerUuid: customerUuid, siteUuid: site }});
        events.map( async event => {
            try {
                const type = event.dataValues.typeEvent;
                if(type === req.params.event){
                    const data = await db[type].findAll({ siteUuid: site });
                    const result = {};
                    result[event.dataValues.typeEvent] = data;
                    res.json(result);
                }
            } catch (err) {
                res.status(400).json({error: err});
            }
        });

    } catch (err) {
        res.status(400).json({error: err})
    }
}

async function getClicks (req, res) {
        const { params : { session } } = req;
        const clicks = await Users.findAll({ where: { sessionId: session } ,include : { model: Clicks } });
        res.json( clicks );
}

async function getInputs (req, res) {
    const { params : { session } } = req;
    const inputs = await Users.findAll({ where: { sessionId: session } ,include : { model: Inputs } });
    res.json( inputs );
}

module.exports = {
    getClicks,
    addEvents,
    getInputs,
    attachEvents,
    getActions,
    getEvents
};
