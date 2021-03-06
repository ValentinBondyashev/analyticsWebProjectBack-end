'use strict';
module.exports = (sequelize, DataTypes) => {
    const users = sequelize.define('users', {
        uuid: {
            allowNull: false,
            type: DataTypes.UUID,
        },
        sessionId: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        siteUuid: {
            type: DataTypes.UUID,
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

    users.associate = function(models) {
        //models.users.hasMany(models.clicks, {foreignKey: 'sessionId'});
        //models.users.hasMany(models.inputs, {foreignKey: 'sessionId'});

        models.users.belongsTo(models.sites);
        models.users.hasMany(models.routes);
    };

    users.sync({
        force: false
    });

    return users;
};
