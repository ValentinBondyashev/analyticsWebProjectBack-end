const uuidv1 = require('uuid/v1');
const db = require('../models/index');

const Routes = db.routes;
const Users = db.users;
const Sites = db.sites;

async function addRoute (req, res) {
    try{
        const { body: { oldUrl, newUrl, sessionId } } = req;
        const route = {
            uuid: uuidv1(),
            userUuid: sessionId,
            from: oldUrl,
            to: newUrl
        };
        const createdRoute = Routes.create(route);

        res.json({createdRoute: createdRoute})
    } catch (err) {
        res.status(400).json({error: err});
    }
}

async function getAllRoutes (req, res) {
    try{
        const { params: { site }} = req;
        const allRoutes = Sites.findAll({
            where: {uuid: site},
            include: [{
                model: Users
            }]
        });
        res.json({allRoutes: allRoutes})
    } catch (err) {
        res.status(400).json({error: err})
    }
}

module.exports = {
    addRoute,
    getAllRoutes
};
