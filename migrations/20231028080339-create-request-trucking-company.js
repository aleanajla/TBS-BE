'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('requestTruckingCompanies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ID_Status: {
        type: Sequelize.INTEGER,
        references:{
          model: "masterStatuses",
          key: "id"
        }
      },
      ID_Request: {
        type: Sequelize.INTEGER,
        references:{
          model: "requests",
          key: "id"
        }
      },
      ID_Customer: {
        type: Sequelize.INTEGER,
        references:{
          model: "masterCustomers",
          key: "id"
        }
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
    await queryInterface.dropTable('requestTruckingCompanies');
  }
};