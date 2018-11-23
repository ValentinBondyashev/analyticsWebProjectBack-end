const uuidv1 = require('uuid/v1');
const db = require('../models/index');
const Clicks = db.clicks;
const Users = db.users;
const Inputs = db.inputs;

async function addEvents (req, res) {
    try{
        const { body } = req;
        for(let key in body ){
            body[key].map(async event => {
                const user = await Users.findOne({where : {sessionId: event.sessionId}});
                if(!user) {
                    await Users.create({ uuid: uuidv1(), sessionId : event.sessionId });
                }
                await db[key].create({ uuid: uuidv1(), sessionId: event.sessionId , ...event });
                return res.json({success: true});
            });
        }
    }
    catch (err) {
        return res.status(500).json({message: "Error", details: err});
    }
}

async function getClicks (req, res) {
        const { params : { session } } = req;
        const clicks = await Users.findAll({ where: { sessionId: session } ,include : { model: Clicks } });
        return res.json( clicks );
}

async function getInputs (req, res) {
    const { params : { session } } = req;
    const inputs = await Users.findAll({ where: { sessionId: session } ,include : { model: Inputs } });
    return res.json( inputs );
}

module.exports = {
    getClicks,
    addEvents,
    getInputs
};
