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
      request.belongsTo(models.masterVessel, {
        foreignKey: "ID_Vessel",
      });
      request.belongsTo(models.masterPort, {
        foreignKey: "ID_Port",
      });
      request.belongsTo(models.masterTerminal, {
        foreignKey: "ID_Terminal",
      });
      // request.hasMany(models.booking, { foreignKey: "No_Request" });
      request.hasOne(models.requestTruckingCompany, {foreignKey: "ID_Request"})
      request.hasOne(models.viewEtiket, { foreignKey: "ID_request" });
      request.belongsTo(models.masterIO, {foreignKey: "ID_IO"})
      request.belongsTo(models.masterCommodity, {foreignKey: "ID_Commodity"})
      request.belongsTo(models.masterService, {foreignKey: "ID_Service"})
      request.hasMany(models.requestContainer, {foreignKey: "ID_Request"})
      request.hasOne(models.requestTruckingCompany, {foreignKey: "ID_Request"})
    }
  }
  request.init(
    {
      No_Request: DataTypes.STRING,
      ID_Vessel: DataTypes.INTEGER,
      ID_Port: DataTypes.INTEGER,
      ID_User: DataTypes.INTEGER,
      ID_Terminal: DataTypes.INTEGER,
      ID_Service: DataTypes.INTEGER,
      ID_Commodity: DataTypes.INTEGER,
      ID_IO: DataTypes.INTEGER,
      Qty: DataTypes.INTEGER,
      POD: DataTypes.STRING,
      FPOD: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "request",
    }
  );
  return request;
};
