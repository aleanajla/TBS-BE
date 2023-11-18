"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class slot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      slot.belongsTo(models.masterTerminal, {
        foreignKey: "ID_Terminal"
      });
      slot.hasMany(models.detailSlot, { foreignKey: "ID_Slot" });
      slot.hasMany(models.booking, { foreignKey: "ID_Slot" });
      slot.hasOne(models.viewEtiket, { foreignKey: "ID_Slot" });
    }
  }
  slot.init(
    {
      ID_Terminal: DataTypes.INTEGER,
      Date: DataTypes.DATEONLY,
    },
    {
      sequelize,
      modelName: "slot",
    }
  );
  return slot;
};
