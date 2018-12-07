'use strict';
module.exports = (sequelize, DataTypes) => {
    const routes = sequelize.define('routes', {
        uuid: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true
        },
        userUuid: {
            type: DataTypes.STRING,
            allowNull: false
        },
        from:{
            type: DataTypes.STRING,
            allowNull: false
        },
        to: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {});
    routes.associate = function(models) {
    };

    routes.sync({
        force: false
    });
    return routes;
};
