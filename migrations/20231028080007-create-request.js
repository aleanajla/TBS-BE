"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("requests", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      }, 
      ID_User: {
        type: Sequelize.INTEGER,
        references: {
          model: "masterUsers",
          key: "id"
        }
      },
      Vessel_Name: {
        type: Sequelize.STRING
      },
      Port_Name: {
        type: Sequelize.STRING
      },
      Terminal_Name: {
        type: Sequelize.STRING
      },
      Service_Name: {
        type: Sequelize.STRING
      },
      Commodity_Name: {
        type: Sequelize.STRING
      },
      IO_Type: {
        type: Sequelize.STRING,
      },
      No_Request: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      Qty: {
        type: Sequelize.INTEGER,
      },
      POD: {
        type: Sequelize.STRING,
      },
      FPOD: {
        type: Sequelize.STRING,
      },
      Closing_Time:{
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("requests");
  },
};
