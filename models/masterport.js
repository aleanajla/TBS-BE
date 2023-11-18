"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class masterPort extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      masterPort.hasMany(models.request, { foreignKey: "ID_Port"});
      masterPort.hasOne(models.viewEtiket, { foreignKey: "ID_Port" });
    }
  }
  masterPort.init(
    {
      Port_Name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "masterPort",
    }
  );
  return masterPort;
};
