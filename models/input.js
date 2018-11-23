'use strict';
module.exports = (sequelize, DataTypes) => {
  const Input = sequelize.define('inputs', {
      uuid: {
          type: DataTypes.UUID,
          allowNull: false,
          primaryKey: true
      },
      sessionId: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      className: DataTypes.STRING,
      localName: DataTypes.STRING,
      targetId: DataTypes.STRING,
      targetValue: DataTypes.STRING,
      time: DataTypes.DATE,
      createdAt: {
          allowNull: false,
          type: DataTypes.DATE
      },
      updatedAt: {
          allowNull: false,
          type: DataTypes.DATE
      }
  }, {});

  Input.associate = function(models) {
  };

  Input.sync({
      force: false
  });

  return Input;
};
