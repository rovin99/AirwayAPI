'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class airport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.City, {
        foreignKey: "city_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

      this.hasMany(models.Flight, {
        foreignKey: "departureAirportId",
        onDelete: "CASCADE",
      });

      this.hasMany(models.Flight, {
        foreignKey: "arrivalAirportId",
        onDelete: "CASCADE",
      });
    }
  }
  airport.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },

    address: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    city_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    
    }
  }, {
    sequelize,
    modelName: 'Airport',
  });
  return airport;
};