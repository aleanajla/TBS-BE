'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class detailSlot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      detailSlot.belongsTo(models.slot, {foreignKey: "ID_Slot"})
      detailSlot.hasMany(models.booking, {foreignKey: "ID_Detail_Slot"})
    }
  }
  detailSlot.init({
    ID_Slot: DataTypes.INTEGER,
    Start: DataTypes.TIME,
    End: DataTypes.TIME,
    Qty: DataTypes.INTEGER,
    Booking_Qty: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'detailSlot',
  });
  return detailSlot;
};