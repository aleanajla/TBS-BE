'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('viewEtikets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ID_Container: {
        type: Sequelize.INTEGER,
        references: {
          model: "masterContainers",
          key: "id",
        },
      },
      ID_Request: {
        type: Sequelize.INTEGER,
        references: {
          model: "requests",
          key: "id",
        },
      },
      ID_Booking: {
        type: Sequelize.INTEGER,
        references: {
          model: "bookings",
          key: "id",
        },
      },
      ID_Slot: {
        type: Sequelize.INTEGER,
        references: {
          model: "slots",
          key: "id",
        },
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
    await queryInterface.dropTable('viewEtikets');
  }
};