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
      // define association here
    }
  }
  assignJob.init(
    {
      ID_Booking: DataTypes.INTEGER,
      TBRCS: DataTypes.STRING,
      Combo: DataTypes.STRING,
      STID_Number: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "assignJob",
    }
  );

  assignJob.associate = function (models) {
    assignJob.belongsTo(models.booking, {foreignKey: "No_Booking", as: "job"})
  };
  return assignJob;
};
