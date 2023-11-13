'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class request extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  request.init({
    No_Request: DataTypes.STRING,
    ID_Vessel: DataTypes.INTEGER,
    ID_Port: DataTypes.INTEGER,
    ID_Terminal: DataTypes.INTEGER,
    Layanan: DataTypes.STRING,
    Qty: DataTypes.INTEGER,
    Commodity: DataTypes.STRING,
    POD: DataTypes.STRING,
    FPOD: DataTypes.STRING,
    OI: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'request',
  });
  request.associate = function (models){
    request.belongsTo(models.masterVessel, {foreignKey: "ID_Vessel", as: "mst_vessel_req"})
    request.belongsTo(models.masterPort, {foreignKey: "ID_Port", as:"mst_port_req"})
    request.belongsTo(models.masterTerminal, {foreignKey: "ID_Terminal", as:"mst_terminal_req"})
    request.hasMany(models.booking, {as: "mst_request_booking"})
    request.hasOne(models.viewEtiket, {as: "request_view"})
  }
  return request;
};