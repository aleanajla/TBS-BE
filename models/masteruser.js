"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class masterUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      masterUser.belongsTo(models.roleManagement, {
        foreignKey: "Role_ID"
      });
      masterUser.belongsTo(models.masterCustomer, {
        foreignKey: "Customer_ID"
      });
      // masterUser.hasMany(models.booking, {foreignKey: "User_ID"})
    }
  }
  masterUser.init(
    {
      Role_ID: DataTypes.INTEGER,
      Customer_ID: DataTypes.INTEGER,
      Username: DataTypes.STRING,
      Name: DataTypes.STRING,
      Password: DataTypes.STRING,
      Phone_Number: DataTypes.STRING,
      Email: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "masterUser",
    }
  );
  return masterUser;
};
