'use strict';
module.exports = (sequelize, DataTypes) => {
  const clicks = sequelize.define('clicks', {
    time: DataTypes.DATE,
    localName: DataTypes.STRING,
    innerText: DataTypes.STRING,
    sessionId: {
      type: DataTypes.STRING,
        references: {
            model: "user",
            key: "sessionId"
        }
    }
  }, {});

  clicks.associate = function (models) {
      models.clicks.belongsTo(models.users, {foreignKey: 'sessionId' });
  };

  clicks.sync({
      force: false
  });

  return clicks;
};
