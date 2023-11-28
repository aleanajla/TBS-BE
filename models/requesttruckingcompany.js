'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class requestTruckingCompany extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      requestTruckingCompany.belongsTo(models.masterStatus, {foreignKey:"ID_Status"})
      requestTruckingCompany.belongsTo(models.request, {foreignKey:"ID_Request"})
      requestTruckingCompany.belongsTo(models.masterCustomer, {foreignKey:"ID_Customer"})
      requestTruckingCompany.hasMany(models.booking, {foreignKey: "ID_Request_TC"})
    }
  }
  requestTruckingCompany.init({
    ID_Status: DataTypes.INTEGER,
    ID_Request: DataTypes.INTEGER,
    ID_Customer: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'requestTruckingCompany',
  });
  return requestTruckingCompany;
};