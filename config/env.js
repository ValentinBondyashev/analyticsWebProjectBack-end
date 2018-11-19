const env = {
    database: 'userdb',
    username: 'postgres',
    password: 'smartit2017',
    host: '127.0.0.1',
    dialect: 'postgres',
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};

module.exports = env;
