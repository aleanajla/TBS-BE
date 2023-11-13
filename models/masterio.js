'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class masterIO extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      masterIO.hasOne(models.request, {foreignKey: "ID_IO"})
    }
  }
  masterIO.init({
    Type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'masterIO',
  });
  return masterIO;
};