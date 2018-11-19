'use strict';
module.exports = (sequelize, DataTypes) => {
  const clicks = sequelize.define('clicks', {
    time: DataTypes.DATE,
    localName: DataTypes.STRING,
    innerText: DataTypes.STRING,
    userSessionId: DataTypes.STRING
  }, {});
  
  clicks.associate = function (models) {
      models.clicks.belongsTo(models.users);
  };

  clicks.sync({
      force: false
  })
  
  return clicks;
};