'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('flights', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      flightNumber: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      departureAirportId:{
        type: Sequelize.STRING,
        allowNull: false,
        references:{
          model: 'airports',
          key: 'code',
        },
        onDelete: 'CASCADE',
      },
      arrivalAirportId:{
        type: Sequelize.STRING,
        allowNull: false,
        references:{
          model: 'airports',
          key: 'code',
        },
        onDelete: 'CASCADE',
      },
      price:{
        type: Sequelize.INTEGER,
        allowNull: false 
      },
      arrival: {
        type: Sequelize.DATE,
        allowNull: false
      },
      departure: {
        type: Sequelize.DATE,
        allowNull: false
      },    
      airplaneId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "airplanes",
          key: "id",
        },
        onDelete: "CASCADE",
        
      },
      boardingGate:{
        type: Sequelize.INTEGER,
      },
      totalSeats:{ //remaining seats
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('flights');
  }
};