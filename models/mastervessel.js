"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class masterVessel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      masterVessel.hasMany(models.request, { foreignKey: "ID_Vessel" });
      masterVessel.hasOne(models.viewEtiket, { foreignKey: "ID_Vessel" });
    }
  }
  masterVessel.init(
    {
      Vessel_Name: DataTypes.STRING,
      Closing_Time: DataTypes.DATE,
      Vessel_Code: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "masterVessel",
    }
  );

  return masterVessel;
};
