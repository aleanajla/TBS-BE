'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('masterSTIDs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      STID_Number: {
        type: Sequelize.STRING
      },
      Driver_ID: {
        type: Sequelize.INTEGER,
        references: {
          model: 'masterDrivers',
          key:'id'
        }
      },
      Truck_ID: {
        type: Sequelize.INTEGER,
        references: {
          model: 'masterTrucks',
          key:'id'
        }
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
    await queryInterface.dropTable('masterSTIDs');
  }
};