'use strict';
module.exports = (sequelize, DataTypes) => {
    const routes = sequelize.define('routes', {
        uuid: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true
        },
        userSessionId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        from:{
            type: DataTypes.STRING
        },
        to: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {});
    routes.associate = function(models) {
        models.routes.belongsTo(models.users)
    };

    routes.sync({
        force: false
    });
    return routes;
};
