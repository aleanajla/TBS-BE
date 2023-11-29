'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('requestContainers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ID_Request: {
        type: Sequelize.INTEGER,
        references: {
          model: "requests",
          key: "id",
        },
      },
      Container_Number: {
        type: Sequelize.STRING,
      },
      Iso_Code: {
        type: Sequelize.STRING,
      },
      Container_Type:{
        type: Sequelize.STRING
      },
      Container_Size:{
        type: Sequelize.STRING,
      },
      Weight:{
        type: Sequelize.INTEGER
      },
      Sling: {
        type: Sequelize.STRING,
      },
      MD: {
        type: Sequelize.STRING,
      },
      OD: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('requestContainers');
  }
};