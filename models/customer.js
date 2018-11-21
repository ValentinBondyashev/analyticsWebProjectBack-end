module.exports = (sequelize, DataTypes) => {
    const Customer = sequelize.define('customers', {
            uuid: {
                type: DataTypes.UUID,
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

    Customer.sync({
        force: false
    });

    return Customer;
};
