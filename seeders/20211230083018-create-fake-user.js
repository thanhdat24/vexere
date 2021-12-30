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
      "users",
      [
        {
          name: "Đạt",
          email: "dat243@gmail.com",
          password: "123456",
          numberPhone: "0123456789",
          avatar: "https://i.pravatar.cc/300",
          type: "ADMIN",
          createdAt: "2021-12-24 22:50:51",
          updatedAt: "2021-12-24 22:50:51",
        },
        {
          name: "Diệp",
          email: "diep0211@gmail.com",
          password: "123456",
          numberPhone: "0123456789",
          avatar: "https://i.pravatar.cc/300",
          type: "ADMIN",
          createdAt: "2021-12-24 22:50:51",
          updatedAt: "2021-12-24 22:50:51",
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
    await queryInterface.bulkDelete("users", null, {});
  },
};
