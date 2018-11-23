'use strict';
module.exports = (sequelize, DataTypes) => {
  const clicks = sequelize.define('clicks', {
      uuid: {
          type: DataTypes.UUID,
          allowNull: false,
          primaryKey: true
      },
      time: DataTypes.DATE,
      localName: DataTypes.STRING,
      innerText: DataTypes.STRING,
      sessionId: {
          type: DataTypes.STRING,
          allowNull: false
      }
  }, {});

  clicks.associate = function (models) {
  };

  clicks.sync({
      force: false
  });

  return clicks;
};
