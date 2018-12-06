'use strict';
module.exports = (sequelize, DataTypes) => {
    const watcherSite = sequelize.define('watcherSite', {
        customerId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        siteId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        createAt: DataTypes.DATE,
        updateAt: DataTypes.DATE
    }, {});
    watcherSite.sync({
        force: false
    });
    return watcherSite;
};
