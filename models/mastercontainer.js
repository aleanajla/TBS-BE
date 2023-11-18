"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class masterContainer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      masterContainer.hasOne(models.viewEtiket, { foreignKey: "ID_Container" });
      masterContainer.belongsTo(models.masterIsoCode, {foreignKey: "ID_Iso_Code"})
      masterContainer.hasMany(models.requestContainer, {foreignKey: "ID_Container"})
    }
  }
  masterContainer.init(
    {
      Container_Number: DataTypes.STRING,
      ID_Iso_Code: DataTypes.STRING,
      Sling: DataTypes.STRING,
      MD: DataTypes.STRING,
      OD: DataTypes.STRING
    },
    {
      sequelize,
      modelName: "masterContainer",
    }
  );
  masterContainer.associate = function (models) {};
  return masterContainer;
};
