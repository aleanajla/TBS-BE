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
      ID_Service: {
        type: Sequelize.INTEGER,
        references: {
          model: "masterServices",
          key: "id",
        },
      },
      ID_Commodity: {
        type: Sequelize.INTEGER,
        references: {
          model: "masterCommodities",
          key: "id",
        },
      },
      ID_OI: {
        type: Sequelize.INTEGER,
        references: {
          model: "masterIOs",
          key: "id",
        },
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
