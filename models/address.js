"use strict";

module.exports = function(sequelize, DataTypes) {
  var Address = sequelize.define("Address", {
    url: DataTypes.STRING,
    random: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  return Address;
};
