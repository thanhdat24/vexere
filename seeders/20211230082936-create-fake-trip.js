"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
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
      "trips",
      [
        {
          fromStation: "1",
          toStation: "2",
          startTime: "2021-12-31 08:30:00",
          price: 200000,
          createdAt: "2021-12-24 20:30:00",
          updatedAt: "2021-12-24 20:30:00",
        },
        {
          fromStation: "3",
          toStation: "4",
          startTime: "2021-12-31 08:30:00",
          price: 250000,
          createdAt: "2021-12-24 20:30:00",
          updatedAt: "2021-12-24 20:30:00",
        },
        {
          fromStation: "1",
          toStation: "4",
          startTime: "2021-12-31 08:30:00",
          price: 300000,
          createdAt: "2021-12-24 20:30:00",
          updatedAt: "2021-12-24 20:30:00",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("trips", null, {});
  },
};
