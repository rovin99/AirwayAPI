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
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      from:{
        type: Sequelize.STRING,
        allowNull: false,
        references:{
          model: 'airports',
          key: 'code',
        },
        onDelete: 'CASCADE',
      },
      to:{
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
      airplane: {
        type: Sequelize.INTEGER,
        allowNull: false,
        
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