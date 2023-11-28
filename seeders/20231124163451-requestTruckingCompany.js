'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const requestTruckingCompany = require("../data/requestTruckingCompany.json");
    requestTruckingCompany.forEach((e) => {
      e.createdAt = new Date(), 
      e.updatedAt = new Date();
    });
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert("requestTruckingCompanies", requestTruckingCompany, {});

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('requestTruckingCompanies', requestTruckingCompany, {});
  }
};
