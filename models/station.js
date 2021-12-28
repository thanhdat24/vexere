"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Station extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Station.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          // kiểm tra độ dài
          // len: [3, 30],
          notEmpty: true,
        },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          checkLen(value) {
            if (value.length >= 5 && value.length <= 20) {
              return true;
            } else {
              throw new Error("Độ dài phải từ 5 đến 20");
            }
          },
        },
      },
      province: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: [["HCM", "CT", "DN", "HP", "HN"]],
        },
      },
    },
    {
      sequelize,
      modelName: "Station",
    }
  );
  return Station;
};
