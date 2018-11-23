'use strict';
module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('sites', {
        uuid: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID
        },
        customerUuid: {
            type: DataTypes.UUID,
            allowNull: false
        },
        address: DataTypes.STRING,
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
    return queryInterface.dropTable('sites');
  }
};
