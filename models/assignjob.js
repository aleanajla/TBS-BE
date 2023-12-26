"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class assignJob extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // assignJob.belongsTo(models.booking, {foreignKey: "No_Booking"})
      assignJob.belongsTo(models.booking, {foreignKey: "ID_Booking"})
      assignJob.belongsTo(models.masterSTID, {foreignKey: "ID_STID"})
    }
  }
  assignJob.init(
    {
      ID_Booking: DataTypes.INTEGER,
      ID_STID: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: "assignJob",
    }
  );
  return assignJob;
};
