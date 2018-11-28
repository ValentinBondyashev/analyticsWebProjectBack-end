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
      },
      siteUuid: {
          type: DataTypes.STRING,
          allowNull: false
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

  clicks.associate = function (models) {
  };

  clicks.sync({
      force: false
  });

  return clicks;
};
