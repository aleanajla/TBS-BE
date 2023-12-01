"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class masterCustomer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      masterCustomer.hasMany(models.masterUser, {foreignKey: "Customer_ID"});
      masterCustomer.hasMany(models.masterDriver, {foreignKey: "ID_Customer"});
      masterCustomer.hasMany(models.masterTruck, {foreignKey: "ID_Customer"});
      masterCustomer.hasMany(models.requestTruckingCompany, {foreignKey: "ID_Customer"})
      masterCustomer.hasMany(models.request, {foreignKey: "ID_Customer"})
      // masterCustomer.hasMany(models.booking, {foreignKey: "Customer_ID"});
    }
  }
  masterCustomer.init(
    {
      Company_Name: DataTypes.STRING,
      Company_Type: DataTypes.STRING,
      PMKU: DataTypes.STRING,
      Email: DataTypes.STRING,
      Address: DataTypes.STRING,
      Phone_Number: DataTypes.STRING,
      NIB: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "masterCustomer",
    }
  );
  return masterCustomer;
};
