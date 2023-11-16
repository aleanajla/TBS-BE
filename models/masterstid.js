'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class masterSTID extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      masterSTID.belongsTo(models.masterDriver, { foreignKey: "Driver_ID", as: "ass_driver" })
      masterSTID.belongsTo(models.masterTruck, { foreignKey: "Truck_ID", as: "ass_truck" })
    }
  }
  masterSTID.init({
    STID_Number: DataTypes.STRING,
    Driver_ID: DataTypes.INTEGER,
    Truck_ID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'masterSTID',
  });
  return masterSTID;
};