'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class masterCommodity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      masterCommodity.hasOne(models.request, {foreignKey: "ID_Commodity"})
    }
  }
  masterCommodity.init({
    Commodity_Type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'masterCommodity',
  });
  return masterCommodity;
};