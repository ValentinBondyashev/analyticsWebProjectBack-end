'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('routes', {
        uuid: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true
        },
        userSessionId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        from:{
            type: DataTypes.STRING,
            allowNull: false
        },
        to: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('routes');
  }
};
