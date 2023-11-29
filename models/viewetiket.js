'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class viewEtiket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  viewEtiket.init({
    ID_Request_Container: DataTypes.INTEGER,
    ID_Request: DataTypes.INTEGER,
    ID_Booking: DataTypes.INTEGER,
    ID_Slot: DataTypes.INTEGER,
    ID_Vessel: DataTypes.INTEGER,
    ID_Port: DataTypes.INTEGER,
    ID_Terminal: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'viewEtiket',
  });
  viewEtiket.associate = function (models) {
    viewEtiket.belongsTo(models.requestContainer, {foreignKey: "ID_Request_Container", as: "mst_container_view"})
    viewEtiket.belongsTo(models.request, {foreignKey: "ID_Container", as: "mst_request_view"})
    viewEtiket.belongsTo(models.booking, {foreignKey: "ID_Booking", as: "mst_booking_view"})
    viewEtiket.belongsTo(models.slot, {foreignKey: "ID_Slot", as : "mst_slot_view"})
    viewEtiket.belongsTo(models.masterVessel, {foreignKey: "ID_Vessel", as : "mst_vessel_view"})
    viewEtiket.belongsTo(models.masterPort, {foreignKey: "ID_Port", as: "mst_port_view"})
    viewEtiket.belongsTo(models.masterTerminal, {foreignKey: "ID_Terminal", as : "mst_terminal_view"})
  }
  return viewEtiket;
};