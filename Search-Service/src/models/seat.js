'use strict';
const {
  Model
} = require('sequelize');
const { Enums } = require('../utils/common');
const { BUSINESS, PREMIUM_ECONOMY, FIRST_CLASS, ECONOMY } = Enums.SEAT_TYPE;
module.exports = (sequelize, DataTypes) => {
  class seat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  seat.init({
    airplaneId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    col: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    row: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM,
      values: [BUSINESS, ECONOMY, PREMIUM_ECONOMY, FIRST_CLASS],
      allowNull: false,
      defaultValue: 'Economy',
    }
  }
  , {
    sequelize,
    modelName: 'seat',
  });
  return seat;
};