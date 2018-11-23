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
        },
        siteUuid: DataTypes.STRING,
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE
        },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE
        }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('clicks');
  }
};
