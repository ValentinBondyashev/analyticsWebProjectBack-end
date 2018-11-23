'use strict';
module.exports = (sequelize, DataTypes) => {
    const inputs = sequelize.define('inputs', {
        uuid: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true
        },
        sessionId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        className: DataTypes.STRING,
        localName: DataTypes.STRING,
        targetId: DataTypes.STRING,
        targetValue: DataTypes.STRING,
        time: DataTypes.DATE,
        siteUuid: DataTypes.STRING,
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE
        },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE
        }
    }, {});

    inputs.associate = function(models) {
    };

    inputs.sync({
        force: false
    });

    return inputs;
};
