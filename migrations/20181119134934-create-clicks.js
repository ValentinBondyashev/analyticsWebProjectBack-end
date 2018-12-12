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
        className: DataTypes.STRING,
        innerText: DataTypes.STRING,
        isTracking: DataTypes.STRING,
        parentUuid: {
            type: DataTypes.UUID,
            allowNull: false
        },
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
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('clicks');
  }
};
