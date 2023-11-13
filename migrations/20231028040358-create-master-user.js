'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('masterUsers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Role_ID: {
        type: Sequelize.INTEGER,
        references: {
            model: 'roleManagements',
            key: 'id'
        }
      },
      Customer_ID: {
        type: Sequelize.INTEGER,
        references: {
          model: 'masterCustomers',
          key: 'id'
      }
      },
      Username: {
        type: Sequelize.STRING
      },
      Name: {
        type: Sequelize.STRING
      },
      Password: {
        type: Sequelize.STRING
      },
      Phone_Number: {
        type: Sequelize.STRING
      },
      Email: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('masterUsers');
  }
};