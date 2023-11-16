"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class masterTerminal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      masterTerminal.hasMany(models.request, { foreignKey: "ID_Terminal"});
      masterTerminal.hasMany(models.slot, { foreignKey: "ID_Terminal" });
      masterTerminal.hasOne(models.viewEtiket, { foreignKey: "ID_Terminal" });
    }
  }
  masterTerminal.init(
    {
      Terminal_Name: DataTypes.STRING,
      Address: DataTypes.STRING,
      Phone_Number: DataTypes.STRING,
      NPWP: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "masterTerminal",
    }
  );

  return masterTerminal;
};
