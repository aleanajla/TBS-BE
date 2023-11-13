'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('masterCustomers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Company_Name: {
        type: Sequelize.STRING,
        allowNull: true
      },
      Company_Type: {
        type: Sequelize.STRING,
        allowNull: true
      },
      PMKU: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Email: {
        type: Sequelize.STRING,
        allowNull: true
      },
      Address: {
        type: Sequelize.STRING,
        allowNull: true
      },
      Phone_Number: {
        type: Sequelize.STRING,
        allowNull: true
      },
      NIB: {
        type: Sequelize.STRING,
        allowNull: true
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
    await queryInterface.dropTable('masterCustomers');
  }
};