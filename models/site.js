'use strict';
module.exports = (sequelize, DataTypes) => {
  const Site = sequelize.define('sites', {
      uuid: {
          allowNull: false,
          primaryKey: true,
          type: DataTypes.UUID
      },
      customerUuid: {
          type: DataTypes.UUID,
          allowNull: false
      },
      address: DataTypes.STRING
  }, {});

  Site.associate = function(models) {
      models.sites.hasMany(models.users, {foreignKey: 'uuid'});
  };

    Site.sync({
        force: false
    });
  return Site;
};
