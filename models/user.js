'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    sessionId: DataTypes.STRING,
    site: DataTypes.STRING,
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
      models.users.hasMany(models.clicks, {foreignKey: 'sessionId' });
  };

  user.sync({
      force: false
  });
  return user;
};
