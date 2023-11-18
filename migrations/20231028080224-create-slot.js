"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("slots", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      ID_Port: {
        type: Sequelize.INTEGER,
        references: {
          model: "masterPorts",
          key: "id",
        },
      },
      ID_Terminal: {
        type: Sequelize.INTEGER,
        references: {
          model: "masterTerminals",
          key: "id",
        },
      },
      Date: {
        type: Sequelize.DATEONLY,
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
    await queryInterface.dropTable("slots");
  },
};
