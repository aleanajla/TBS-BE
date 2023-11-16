'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class masterTruck extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      masterTruck.hasOne(models.masterSTID, {foreignKey: "Truck_ID"})
      masterTruck.belongsTo(models.masterCustomer, {foreignKey: "ID_Customer"})
    }
  }
  masterTruck.init({
    ID_Customer : DataTypes.INTEGER,
    Plat_Number: DataTypes.STRING,
    Size: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'masterTruck',
  });
  return masterTruck;
};