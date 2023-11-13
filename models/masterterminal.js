'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class masterTerminal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  masterTerminal.init({
    Terminal_Name: DataTypes.STRING,
    Address: DataTypes.STRING,
    Phone_Number: DataTypes.STRING,
    NPWP: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'masterTerminal',
  });

  masterTerminal.associate = function (models){
    masterTerminal.hasMany(models.request, {as: "terminal_req"})
    masterTerminal.hasMany(models.slot, {as: "terminal_slot"})
    masterTerminal.hasOne(models.viewEtiket, {as: "terminal_view"})
  }
  return masterTerminal;
};