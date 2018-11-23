'use strict';
module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('inputs', {
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
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('inputs');
  }
};
