'use strict';
module.exports = function(sequelize, DataTypes) {
  var User2 = sequelize.define('User2', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    bio: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return User2;
};