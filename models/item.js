"use strict";

module.exports = function (sequelize, DataTypes) {
    var Item = sequelize.define('Item', {
        lecture: DataTypes.STRING,
        board: DataTypes.STRING,
        title: DataTypes.STRING,
        mailed: {
            type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false
        },
        base64: {
            type: DataTypes.TEXT, primaryKey: true
        }
    });


    Item.associate = function (models) {
        Item.belongsTo(models.User, {
            onDelete: "CASCADE",
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Item;
};