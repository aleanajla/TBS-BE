'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class masterPort extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  masterPort.init({
    Port_Name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'masterPort',
  });
  masterPort.associate = function (models){
    masterPort.hasMany(models.request, {as: "port_req"})
    masterPort.hasMany(models.slot, {as: "port_slot"})
    masterPort.hasOne(models.viewEtiket, {as: "port_view"})
  }
  return masterPort;
};