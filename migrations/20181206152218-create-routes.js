'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('routes', {
        uuid: {
            type: Sequelize.UUID,
            allowNull: false,
            primaryKey: true
        },
        userSessionId: {
            type: Sequelize.STRING,
            allowNull: false
        },
        from:{
            type: Sequelize.STRING,
            allowNull: false
        },
        to: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('routes');
  }
};
