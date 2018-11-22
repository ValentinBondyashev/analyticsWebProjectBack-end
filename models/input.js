'use strict';
module.exports = (sequelize, DataTypes) => {
  const Input = sequelize.define('inputs', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    sessionId: DataTypes.STRING,
    className: DataTypes.STRING,
    localName: DataTypes.STRING,
    targetId: DataTypes.STRING,
    targetValue: DataTypes.STRING,
    time: DataTypes.DATE
  }, {});
  Input.associate = function(models) {
      models.inputs.belongsTo(models.users, {foreignKey: 'sessionId'});
  };
  return Input;
};
