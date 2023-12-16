"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("bookings", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      // No_Request: {
      //   type: Sequelize.STRING,
      //   references: {
      //     model: "requests",
      //     key: "No_Request",
      //   },
      // },
      // Customer_ID:{
      //   type: Sequelize.INTEGER,
      //   references:{
      //     model: "masterCustomers",
      //     key: "id"
      //   }
      // },
      ID_Request_TC:{
        type: Sequelize.INTEGER,
        references:{
          model: "requestTruckingCompanies",
          key: "id"
        }
      },
      ID_Detail_Slot: {
        type: Sequelize.INTEGER,
        references: {
          model: "detailSlots",
          key: "id",
        },
      },
      ID_Request_Container:{
        type: Sequelize.INTEGER,
        references:{
          model: "requestContainers",
          key: "id"
        },
      },
      No_Booking: {
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
    await queryInterface.dropTable("bookings");
  },
};
