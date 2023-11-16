'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('masterDrivers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ID_Customer:{
        type : Sequelize.INTEGER,
        references:{
          model: 'masterCustomers',
          key: 'id'
        }
      },
      Driver_Name: {
        type: Sequelize.STRING
      },
      Driver_ID: {
        type: Sequelize.STRING
      },
      Phone_Number: {
        type: Sequelize.STRING
      },
      SIM_Number: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('masterDrivers');
  }
};