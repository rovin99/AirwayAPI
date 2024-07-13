'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class flights extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      this.belongsTo(models.Airplane, {
        foreignKey: "airplaneId",
        as: "airplaneDetail",
      });

      this.belongsTo(models.Airport, {
        foreignKey: "departureAirportId",
        as: "departureAirport",
      });

      this.belongsTo(models.Airport, {
        foreignKey: "arrivalAirportId",
        as: "arrivalAirport",
      });
    }
  }
  flights.init({
    flightNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    departureAirportId:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    arrivalAirportId:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false 
    },

    arrival: {
      type: DataTypes.DATE,
      allowNull: false
    },
    departure: {
      type: DataTypes.DATE,
      allowNull: false
    },    
    airplane: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    boardingGate:{
      type: DataTypes.INTEGER,
    },
    totalSeats:{
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Flight',
  });
  return flights;
};