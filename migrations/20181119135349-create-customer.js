'use strict';
module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('customers', {
        uuid: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING,
            unique: true
        },
        hash: {
            type: DataTypes.STRING(5000)
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
    return queryInterface.dropTable('customers');
  }
};
