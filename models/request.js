"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class request extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      request.belongsTo(models.masterCustomer, {foreignKey: "ID_Customer"})
      request.hasOne(models.requestTruckingCompany, {foreignKey: "ID_Request"})
      request.hasOne(models.viewEtiket, { foreignKey: "ID_request" });
      request.hasMany(models.requestContainer, {foreignKey: "ID_Request"})
    }
  }
  request.init(
    {
      ID_Customer: DataTypes.INTEGER,
      No_Request: DataTypes.STRING,
      Vessel_Name: DataTypes.STRING,
      Port_Name: DataTypes.STRING,
      Terminal_Name: DataTypes.STRING,
      Service_Name: DataTypes.STRING,
      Commodity_Name: DataTypes.STRING,
      IO_Type: DataTypes.STRING,
      Qty: DataTypes.INTEGER,
      POD: DataTypes.STRING,
      FPOD: DataTypes.STRING,
      Closing_Time: DataTypes.DATE
    },
    {
      sequelize,
      modelName: "request",
    }
  );
  return request;
};
