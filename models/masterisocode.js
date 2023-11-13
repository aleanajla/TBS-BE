'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class masterIsoCode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      masterIsoCode.hasOne(models.masterContainer, {foreignKey: "ID_Iso_Code"})
    }
  }
  masterIsoCode.init({
    Iso_Code: DataTypes.STRING,
    Size: DataTypes.STRING,
    Type: DataTypes.STRING,
    Width: DataTypes.STRING,
    Height: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'masterIsoCode',
  });
  return masterIsoCode;
};