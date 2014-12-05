"use strict";

module.exports = function(sequelize, DataTypes) {
  var Address = sequelize.define("Address", {

    url: {
          type: DataTypes.STRING,
          validate: {
            notEmpty: { msg: "Cannot shorten an empty URL!"},
            isUrl: { msg: "Not a valid URL. Try again!"}
        }
    },
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
