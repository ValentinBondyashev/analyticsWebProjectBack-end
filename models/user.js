'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      type: DataTypes.INTEGER
    },
    sessionId: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true
    },
    siteAddress: DataTypes.STRING,
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {});

  user.associate = function(models) {
      models.users.hasMany(models.clicks, {foreignKey: 'sessionId'});
      models.users.hasMany(models.inputs, {foreignKey: 'sessionId'});
      models.users.belongsTo(models.sites, {foreignKey: 'siteAddress'});
  };

  user.sync({
      force: false
  });
  return user;
};
