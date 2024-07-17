'use strict';
const {
  Model
} = require('sequelize');
const {Enums}=require("../utils/common")
const { PENDING, BOOKED, CANCELLED } = Enums.TICKET_STATUS;
module.exports = (sequelize, DataTypes) => {
  class ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ticket.init({
    subject: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
    recepientEmail: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM,
      values: [PENDING, BOOKED, CANCELLED],
      defaultValue: PENDING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Ticket',
  });
  return ticket;
};