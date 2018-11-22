module.exports = (sequelize, DataTypes) => {
    const customer = sequelize.define('customers', {
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

    customer.associate = function(models) {
        models.customers.hasMany(models.sites, {foreignKey: 'customerUuid'});
    };

    customer.sync({
        force: false
    });

    return customer;
};
