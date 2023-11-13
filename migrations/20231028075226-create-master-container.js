"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("masterContainers", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      ID_Iso_Code: {
        type: Sequelize.INTEGER,
        references: {
          model: "masterIsoCodes",
          key: "id",
        },
      },
      Container_Number: {
        type: Sequelize.INTEGER,
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
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("masterContainers");
  },
};
