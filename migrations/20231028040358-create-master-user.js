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
        },
        allowNull: false
      },
      Customer_ID: {
        type: Sequelize.INTEGER,
        references: {
          model: 'masterCustomers',
          key: 'id'
        },
        allowNull: false
      },
      Username: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Phone_Number: {
        type: Sequelize.STRING,

      },
      Email: {
        type: Sequelize.STRING,
        allowNull: false
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