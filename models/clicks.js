'use strict';
module.exports = (sequelize, DataTypes) => {
  const clicks = sequelize.define('clicks', {
    time: DataTypes.DATE,
    localName: DataTypes.STRING,
    innerText: DataTypes.STRING,
    sessionId:  DataTypes.STRING
  }, {});

  clicks.associate = function (models) {
      models.clicks.belongsTo(models.users, {foreignKey: 'sessionId'});
  };

  clicks.sync({
      force: false
  });

  return clicks;
};
