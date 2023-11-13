'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('masterContainers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ID_Iso_Code: {
        type: Sequelize.INTEGER
      },
      ID_Cont_Size: {
        type: Sequelize.INTEGER
      },
      ID_Cont_type: {
        type: Sequelize.INTEGER
      },
      Container_Number: {
        type: Sequelize.INTEGER
      },
      Sling: {
        type: Sequelize.STRING
      },
      MD: {
        type: Sequelize.STRING
      },
      OD: {
        type: Sequelize.STRING
      },
      Weight: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('masterContainers');
  }
};