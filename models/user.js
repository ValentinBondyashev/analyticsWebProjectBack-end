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
      models.users.hasMany(models.clicks, {foreignKey: 'sessionId'});
  };

  user.sync({
      force: false
  });
  return user;
};
