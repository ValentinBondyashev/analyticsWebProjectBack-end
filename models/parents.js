'use strict';
module.exports = (sequelize, DataTypes) => {
    const parents = sequelize.define('parents', {
        uuid: {
            type: DataTypes.UUID,
            primaryKey: true
        },
        className: DataTypes.STRING,
        isTracking: DataTypes.STRING,
        innerText: DataTypes.STRING,
        tag: DataTypes.STRING
    }, {});
    parents.associate = function(models) {
        models.parents.hasMany(models.clicks);
    };

    parents.sync({
        force: false
    });
    return parents;
};
