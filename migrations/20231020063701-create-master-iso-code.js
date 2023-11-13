'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('masterIsoCodes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Iso_Code: {
        type: Sequelize.STRING
      },
      Size: {
        type: Sequelize.STRING
      },
      Type: {
        type: Sequelize.STRING
      },
      Width: {
        type: Sequelize.STRING
      },
      Height: {
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
    await queryInterface.dropTable('masterIsoCodes');
  }
};