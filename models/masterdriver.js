'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class masterDriver extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      masterDriver.hasOne(models.masterSTID, {foreignKey: "Driver_ID"})
      masterDriver.belongsTo(models.masterCustomer, {foreignKey: "ID_Customer"})
    }
  }
  masterDriver.init({
    ID_Customer: DataTypes.INTERGER,
    Driver_Name: DataTypes.STRING,
    Driver_ID: DataTypes.STRING,
    Phone_Number: DataTypes.STRING,
    SIM_Number: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'masterDriver',
  });
  return masterDriver;
};