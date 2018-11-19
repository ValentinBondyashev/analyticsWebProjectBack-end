const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const uuidv1 = require('uuid/v1');

module.exports = (sequelize, Sequelize) => {
    const Customer = sequelize.define('customer', {
            uuid: {
                type: Sequelize.UUID,
                primaryKey: true
            },
            email: {
                type: Sequelize.STRING,
                unique: true
            },
            hash: {
                type: Sequelize.STRING(5000)
            },
            salt: {
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

    Customer.prototype.validatePassword = function(password) {
        const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
        return this.hash === hash;
    };

    Customer.prototype.setPassword = function(password) {
        this.salt = crypto.randomBytes(16).toString('hex');
        this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
        this.uuid = uuidv1();
    };

    Customer.prototype.toAuthJSON = function() {
        return {
            id: this.id,
            email: this.email,
            token: this.generateJWT(),
        };
    };

    Customer.prototype.generateJWT = function() {
        const today = new Date();
        const expirationDate = new Date(today);
        expirationDate.setDate(today.getDate() + 60);

        return jwt.sign({
            email: this.email,
            id: this.id,
            uuid: this.uuid,
            exp: parseInt(expirationDate.getTime() / 1000, 10),
        }, 'secret');
    };

    Customer.sync({
        force: false
    });

    return Customer;
};
