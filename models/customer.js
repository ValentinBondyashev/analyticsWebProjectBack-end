module.exports = (sequelize, DataTypes) => {
    const customers = sequelize.define('customers', {
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

    customers.associate = function(models) {
        models.customers.hasMany(models.sites, {foreignKey: 'customerUuid'});
    };

    customers.sync({
        force: false
    });

    return customers;
};
