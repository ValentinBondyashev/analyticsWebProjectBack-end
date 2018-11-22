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
    time: DataTypes.DATE
  }, {});

  Input.associate = function(models) {
      models.inputs.belongsTo(models.users, {foreignKey: 'sessionId'});
  };

  Input.sync({
      force: false
  });

  return Input;
};
