'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('users', {
    uuid: {
        allowNull: false,
        type: DataTypes.UUID,
    },
    sessionId: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
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

  user.associate = function(models) {
      models.users.hasMany(models.clicks, {foreignKey: 'sessionId'});
      models.users.hasMany(models.inputs, {foreignKey: 'sessionId'});
  };

  user.sync({
      force: false
  });

  return user;
};
