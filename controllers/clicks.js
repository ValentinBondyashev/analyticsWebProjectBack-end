const db = require('./../models/index');
const Clicks = db.clicks;
const Users = db.users;

async function addClicks (req, res) {
    try{
        const { body: { click } } = req;
        click.map(async click => {
            await Users.findOne({sessionId: click.sessionId});
            try{
                await Users.create({ sessionId : click.sessionId});
            }catch(err){
                console.log(err);
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
        const { params : { user } } = req;
        const clicks = await Clicks.findAll({where: {userSessionId: user} ,include:{ model: Users } });
        return res.json( clicks );
}


module.exports = {
    getClicks,
    addClicks
};
