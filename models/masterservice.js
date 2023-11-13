'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class masterService extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      masterService.hasOne(models.request, {foreignKey: "ID_Service"})
    }
  }
  masterService.init({
    Service_Name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'masterService',
  });
  return masterService;
};