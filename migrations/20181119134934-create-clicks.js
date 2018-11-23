'use strict';
module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('clicks', {
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
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('clicks');
  }
};
