'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class masterStatus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      masterStatus.hasOne(models.requestTruckingCompany, {foreignKey: "ID_Status"})
    }
  }
  masterStatus.init({
    Status_Name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'masterStatus',
  });
  return masterStatus;
};