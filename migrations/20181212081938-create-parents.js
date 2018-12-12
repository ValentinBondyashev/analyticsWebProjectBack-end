'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('parents', {
            uuid: {
                type: Sequelize.UUID,
                primaryKey: true
            },
            className: {
                type: Sequelize.STRING
            },
            innerText: {
                type: Sequelize.STRING
            },
            isTracking: {
                type: Sequelize.STRING
            },
            tag: {
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('parents');
    }
};
