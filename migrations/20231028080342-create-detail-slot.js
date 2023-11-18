"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("detailSlots", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      ID_Slot: {
        type: Sequelize.INTEGER,
        references: {
          model: "slots",
          key: "id",
        },
      },
      Start: {
        type: Sequelize.TIME,
      },
      End: {
        type: Sequelize.TIME,
      },
      Qty: {
        type: Sequelize.INTEGER,
      },
      Booking_Qty: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("detailSlots");
  },
};
