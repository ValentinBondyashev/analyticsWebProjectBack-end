'use strict';
module.exports = (sequelize, DataTypes) => {
    const sites = sequelize.define('sites', {
        uuid: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID
        },
        address: {
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

    sites.associate = function(models) {
        models.sites.belongsToMany(models.customers, {as:'Watcher', through: 'watcherSite', foreignKey: 'siteId', otherKey: 'customerId'});
        //models.sites.hasMany(models.users);
    };

    sites.sync({
        force: false
    });
    return sites;
};
