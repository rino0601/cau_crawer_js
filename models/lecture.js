'use strict';
module.exports = function(sequelize, DataTypes) {
  var Lecture = sequelize.define('Lecture', {
    name: DataTypes.STRING,
    id: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Lecture;
};