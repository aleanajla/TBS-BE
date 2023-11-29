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
      ID_Request_Container: {
        type: Sequelize.INTEGER,
        references: {
          model: "requestContainers",
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