const uuidv1 = require('uuid/v1');
const { CustomerServices, EventsServices } = require('../services');
const querystring = require('querystring');
const db = require('../models/index');
const Users = db.users;
const Events = db.events;
const Sites = db.sites;
const Clicks = db.clicks;
const Parents = db.parents;

async function addEvents (req, res) {
    try{
        const { body } = req;
        const site = await Sites.findOne({where : {address : req.get('origin')} });
        const siteUuid = site.uuid;
        for(let key in body ){
            await body[key].map(async event => {
                try {
                    const { className, localName, innerText, isTracking } = event.parent;
                    const parent = await Parents.findOrCreate({where: {className: className, tag: localName}, defaults: {isTracking: isTracking,innerText: innerText, uuid: uuidv1()}  })
                        .spread(async (parent, created) => {
                            const parentUuid = parent.get().uuid;
                            const user = await Users.findOne({ where : { sessionId: event.sessionId }});
                            if(!user) {
                                await Users.create({ uuid: uuidv1(), sessionId : event.sessionId, siteUuid: siteUuid});
                            }
                            if(db[key]){
                                await db[key].create({ uuid: uuidv1(), sessionId: event.sessionId , siteUuid: siteUuid, parentUuid: parentUuid, ...event });
                            }
                        });
                } catch (err) {
                    res.status(400).json({error: err});
                }
            });
        }
        res.json({success: true});
    }
    catch (err) {
        res.status(400).json({message: "Error", details: err});
    }
}

async function attachEvents ( req, res ) {
    try {
        const { headers: { authorization } } = req;
        const customerUuid = CustomerServices.getCustomerInfo(authorization, 'uuid');
        const { body : { site } } = req;
        await Promise.all(
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
                    }
                } catch (err) {
                    res.status(404).json({error: err});
                }
            })
        );
        res.json({ success: true });
    } catch (err) {
        res.status(400).json({error: err})
    }
}

async function deleteAttachEvents ( req, res ) {
    try {
        const { headers: { authorization } } = req;
        const customerUuid = CustomerServices.getCustomerInfo(authorization, 'uuid');
        const { body : { siteUuid, events } } = req;
        events.map(async (event) => {
            try {await Events.destroy({ where: { customerUuid: customerUuid, siteUuid: siteUuid, typeEvent: event }});
           } catch( err ){
               res.status(404).json({error: err});
           }
        });
        res.json({success: true});
    } catch (err) {
        res.status(400).json({error: err})
    }
}

async function getActions ( req, res ) {
    try{
        const { headers: { authorization } } = req;
        const customerUuid = CustomerServices.getCustomerInfo(authorization, 'uuid');
        const query = querystring.parse(req.url);
        const { filter } = query;
        const siteUuid = await EventsServices.checkQueryParamsOrOrigin({query: query.site, origin: req.get('origin')});
        const events = await Events.findAll({ where: { siteUuid: siteUuid, customerUuid: customerUuid }});
        if(events.length){
            let allEvents = {};
            await Promise.all(
                events.map( async event => {
                        const type = event.dataValues.typeEvent;
                        let data;
                        if(filter){
                            data = await db[type].findAll({ where : { siteUuid: siteUuid }, order: db.sequelize.literal(filter)});
                        }else {
                            data = await db[type].findAll({ where : { siteUuid: siteUuid }});
                        }
                        allEvents[type] = data;
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
        const { headers: { authorization } } = req;
        const customerUuid = CustomerServices.getCustomerInfo(authorization, 'uuid');
        const siteUuid = await EventsServices.checkQueryParamsOrOrigin({query: req.params.site, origin: req.get('origin')});
        const events = await Events.findAll({ where: { siteUuid: siteUuid,  customerUuid: customerUuid }});
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
        const { headers: { authorization } } = req;
        const customerUuid = CustomerServices.getCustomerInfo(authorization, 'uuid');
        const siteUuid = await EventsServices.checkQueryParamsOrOrigin({query: req.params.site, origin: req.get('origin')});
        const events = await Events.findAll({ where: { customerUuid: customerUuid, siteUuid: siteUuid }});
        if(events.length){
            events.map( async event => {
                try {
                    const type = event.dataValues.typeEvent;
                    if(type === req.params.event){
                        const data = await db[type].findAll({ where: { siteUuid: siteUuid }} );

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

async function getAllSortClicks (req, res) {
    try{
        const { headers: { authorization } } = req;
        const customerUuid = CustomerServices.getCustomerInfo(authorization, 'uuid');
        const site = await Sites.findOne({where : {address : req.get('origin')} });
        const event = await Events.findOne({ where: { customerUuid: customerUuid, siteUuid: site.uuid, typeEvent: 'clicks' }});
        if(event){
            const clicks = await Clicks.findAll({ where: { siteUuid: site.uuid }, include: [
                    {
                        model: Parents
                    }
                ]});
            let sortClicks = [];
            clicks.map((click) => {
                if(sortClicks.length) {
                    sortClicks.map(sortClick => {
                        if (click.className === sortClick.click.className) {
                            if(click.parent.uuid === sortClick.click.parent.uuid){
                                sortClick.count = sortClick.count + 1
                            }else {
                                sortClicks.push({click, count: 1})
                            }
                        } else {
                            sortClicks.push({click, count: 1})
                        }
                    });
                } else {
                    sortClicks.push({click, count: 1});
                }
                return null
            });
            res.json(sortClicks);
        }else {
            res.status(404).json({error: 'clicks not found'})
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
    deleteAttachEvents,
    getAllSortClicks
};
