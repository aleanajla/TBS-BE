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
      // define association here
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
  detailSlot.associate = function (models) {
    detailSlot.belongsTo(models.slot, {foreignKey: "ID_Slot", as: "slot"})
  }
  return detailSlot;
};