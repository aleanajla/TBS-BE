'use strict';

const { hashPassword } = require('../bycrpt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const user = require("../data/user.json")
    user.forEach(e => {
      e.createdAt = new Date(),
      e.updatedAt = new Date(),
      e.Password = hashPassword(e.Password)
    })

    // console.log(user, "user")
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('masterUsers', user, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('masterUsers', null, {});
  }
};
