"use strict";

module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define('User', {
        id: {
            type: DataTypes.STRING, primaryKey: true
        },
        password: {
            type: DataTypes.STRING, notNull: true
        }
    });

    User.associate = function (models) {
        User.hasMany(models.Item);
    };

    return User;
};