const db = require('../models/index');
const Clicks = db.clicks;
const Users = db.users;

async function addClicks (req, res) {
    try{
        const { body: { clicks } } = req;
            clicks.map(async click => {
            const user = await Users.findOne({where : {sessionId: click.sessionId}});
            if(!user) {
                await Users.create({ sessionId : click.sessionId });
            }
            const clicks = await Clicks.create({userSessionId: click.sessionId ,...click});
            return res.json({clicks: clicks});
        });
    }
    catch (err) {
        return res.status(500).json({message: "Error", details: err});
    }
}

async function getClicks (req, res) {
        const { params : { session } } = req;
        const clicks = await Users.findAll({where: {sessionId: session} ,include:{ model: Clicks } });
        return res.json( clicks );
}


module.exports = {
    getClicks,
    addClicks
};
