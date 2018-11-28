'use strict';
module.exports = (sequelize, DataTypes) => {
    const events = sequelize.define('events', {
        uuid: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true
        },
        siteUuid: {
            type: DataTypes.STRING,
            allowNull: false
        },
        customerUuid: {
            type: DataTypes.STRING,
            allowNull: false
        },
        typeEvent:{
            type: DataTypes.STRING,
            allowNull: false
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE
        },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE
        }
    }, {});
    events.associate = function(models) {
        // associations can be defined here
    };
    events.sync({
        force: false
    });
    return events;
};
