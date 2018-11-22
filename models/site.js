'use strict';
module.exports = (sequelize, DataTypes) => {
  const Site = sequelize.define('sites', {
    customerUuid: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: DataTypes.STRING
  }, {});

  Site.associate = function(models) {
      models.sites.belongsTo(models.customers, {foreignKey: 'customerUuid'});
      models.sites.hasMany(models.users, {foreignKey: 'siteAddress'});
  };

    Site.sync({
        force: false
    });
  return Site;
};
