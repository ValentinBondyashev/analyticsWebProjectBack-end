module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('user', {
        sessionId: {
            type: Sequelize.STRING,
            primaryKey: true,
            allowNull: false,
            unique: true
        },
        site: {
            type: Sequelize.STRING
        }
    });

    User.associate = function(models) {
        models.user.hasMany(models.clicks);
    };

    User.sync({
        force: false
    });

    return User;
};
