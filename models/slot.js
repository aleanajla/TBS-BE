'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class slot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  slot.init({
    ID_Port: DataTypes.INTEGER,
    ID_Terminal: DataTypes.INTEGER,
    Date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'slot',
  });
  slot.associate = function (models) {
    slot.belongsTo(models.masterPort, {foreignKey: "ID_Port", as: "mst_port_slot"})
    slot.belongsTo(models.masterTerminal, {foreignKey: "ID_Terminal", as: "mst_terminal_slot"})
    slot.hasMany(models.detailSlot, {as: "detail"})
    slot.hasMany(models.booking, {as: "slot_booking"})
    slot.hasOne(models.viewEtiket, {as: "slot_view"})
  }
  return slot;
};