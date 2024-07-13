'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert(
      "Seats",
      [
        {
          airplaneId: 2,
          row: 1,
          col: "A",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          airplaneId: 2,
          row: 1,
          col: "B",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          airplaneId: 2,
          row: 1,
          col: "C",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          airplaneId: 2,
          row: 1,
          col: "D",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          airplaneId: 2,
          row: 1,
          col: "E",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          airplaneId: 2,
          row: 1,
          col: "F",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          airplaneId: 2,
          row: 2,
          col: "A",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          airplaneId: 2,
          row: 2,
          col: "B",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          airplaneId: 2,
          row: 2,
          col: "C",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          airplaneId: 2,
          row: 2,
          col: "D",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          airplaneId: 2,
          row: 2,
          col: "E",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          airplaneId: 2,
          row: 2,
          col: "F",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
          
          {
            airplaneId: 2,
            row: 3,
            col: "A",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            airplaneId: 2,
            row: 3,
            col: "B",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            airplaneId: 2,
            row: 3,
            col: "C",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            airplaneId: 2,
            row: 3,
            col: "D",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            airplaneId: 2,
            row: 3,
            col: "E",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            airplaneId: 2,
            row: 3,
            col: "F",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
  
          {
            airplaneId: 2,
            row: 4,
            col: "A",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            airplaneId: 2,
            row: 4,
            col: "B",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            airplaneId: 2,
            row: 4,
            col: "C",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            airplaneId: 2,
            row: 4,
            col: "D",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            airplaneId: 2,
            row: 4,
            col: "E",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            airplaneId: 2,
            row: 4,
            col: "F",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
  
          {
            airplaneId: 2,
            row: 5,
            col: "A",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            airplaneId: 2,
            row: 5,
            col: "B",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            airplaneId: 2,
            row: 5,
            col: "C",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            airplaneId: 2,
            row: 5,
            col: "D",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            airplaneId: 2,
            row: 5,
            col: "E",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            airplaneId: 2,
            row: 5,
            col: "F",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
  
          {
            airplaneId: 2,
            row: 6,
            col: "A",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            airplaneId: 2,
            row: 6,
            col: "B",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            airplaneId: 2,
            row: 6,
            col: "C",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            airplaneId: 2,
            row: 6,
            col: "D",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            airplaneId: 2,
            row: 6,
            col: "E",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            airplaneId: 2,
            row: 6,
            col: "F",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
  
          {
            airplaneId: 2,
            row: 7,
            col: "A",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            airplaneId: 2,
            row: 7,
            col: "B",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            airplaneId: 2,
            row: 7,
            col: "C",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            airplaneId: 2,
            row: 7,
            col: "D",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            airplaneId: 2,
            row: 7,
            col: "E",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            airplaneId: 2,
            row: 7,
            col: "F",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            airplaneId: 3,
            row: 1,
            col: "A",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            airplaneId: 3,
            row: 1,
            col: "B",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            airplaneId: 3,
            row: 1,
            col: "C",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            airplaneId: 3,
            row: 1,
            col: "D",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            airplaneId: 3,
            row: 1,
            col: "E",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            airplaneId: 3,
            row: 1,
            col: "F",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
  
          {
            airplaneId: 3,
            row: 2,
            col: "A",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            airplaneId: 3,
            row: 2,
            col: "B",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            airplaneId: 3,
            row: 2,
            col: "C",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            airplaneId: 3,
            row: 2,
            col: "D",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            airplaneId: 3,
            row: 2,
            col: "E",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            airplaneId: 3,
            row: 2,
            col: "F",
            createdAt: new Date(),
            updatedAt: new Date(),
          },


      ],
      {},
    );
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
