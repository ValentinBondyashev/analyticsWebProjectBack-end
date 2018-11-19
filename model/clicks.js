module.exports = (sequelize, Sequelize) => {
    const Clicks = sequelize.define('clicks', {
        userSessionId: {
            type: Sequelize.STRING,
        },
        time: {
            type: Sequelize.DATE
        },
        localName: {
            type: Sequelize.STRING
        },
        innerText: {
            type: Sequelize.STRING
        }
    });

    Clicks.associate = function (models) {
        models.clicks.belongsTo(models.user);
    };

    Clicks.sync({
        force: false
    });

    return Clicks;
};
