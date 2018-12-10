'use strict';
module.exports = {
    up: (queryInterface, DataTypes) => {
        return queryInterface.createTable('users', {
            uuid: {
                allowNull: false,
                type: DataTypes.UUID
            },
            sessionId: {
                type: DataTypes.STRING,
                primaryKey: true,
                allowNull: false
            },
            siteUuid: {
                type: DataTypes.UUID,
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
        return queryInterface.dropTable('users');
    }
};
