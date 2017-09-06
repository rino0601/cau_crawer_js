/**
 * https://sequelize.readthedocs.io/en/v3/
 * https://www.npmjs.com/package/sequelize-cli
 */
require('dotenv').config();

module.exports = {
    "development": {
        "dialect": "sqlite",
        "storage": "./db.development.sqlite"
    },
    "test": {
        "dialect": "sqlite",
        "storage": ":memory:"
    },
    "production": {
        "username": "root",
        "password": null,
        "database": "database_production",
        "host": "127.0.0.1",
        "dialect": "mysql"
    }
};