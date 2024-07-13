'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addConstraint('airports',{
      fields: ['city_id'],
      type: 'foreign key',
      name: 'city-airport-association',
      references:{
        table: 'cities',
        field: 'id'
      },
      onDelete: 'CASCADE',
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.changeColumn('airports', 'city_id', {
      type: Sequelize.INTEGER, // remove foreign key constraint
      onDelete: null,
      references: null
    });
  }
};
