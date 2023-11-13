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
      No_Request: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      ID_Vessel: {
        type: Sequelize.INTEGER,
        references: {
          model: "masterVessels",
          key: "id",
        },
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
      Layanan: {
        type: Sequelize.STRING,
      },
      Qty: {
        type: Sequelize.INTEGER,
      },
      Commodity: {
        type: Sequelize.STRING,
      },
      POD: {
        type: Sequelize.STRING,
      },
      FPOD: {
        type: Sequelize.STRING,
      },
      OI: {
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
    await queryInterface.dropTable("requests");
  },
};
