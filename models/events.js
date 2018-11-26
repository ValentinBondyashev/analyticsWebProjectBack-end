'use strict';
module.exports = (sequelize, DataTypes) => {
    const events = sequelize.define('events', {
        uuid: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true
        },
        siteUuid: DataTypes.STRING,
        customerUuid: DataTypes.STRING,
        typeEvent: DataTypes.STRING,
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
    return events;
};
