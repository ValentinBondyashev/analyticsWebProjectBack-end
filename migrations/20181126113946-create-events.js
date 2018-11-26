'use strict';
module.exports = {
    up: (queryInterface, DataTypes) => {
        return queryInterface.createTable('events', {
            uuid: {
                type: DataTypes.UUID,
                primaryKey: true,
                allowNull: false,
            },
            siteUuid: {
                type: DataTypes.STRING
            },
            customerUuid: {
                type: DataTypes.STRING
            },
            typeEvent: {
                type: DataTypes.STRING
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
        return queryInterface.dropTable('events');
    }
};
