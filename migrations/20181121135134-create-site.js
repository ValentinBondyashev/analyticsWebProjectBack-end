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
        address: DataTypes.STRING
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('sites');
  }
};
