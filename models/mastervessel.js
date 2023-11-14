'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class masterVessel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  masterVessel.init({
    Vessel_Name: DataTypes.STRING,
    Closing_Time: DataTypes.DATE,
    Vessel_Code: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'masterVessel',
  });
  masterVessel.associate = function (models){
    masterVessel.hasMany(models.request, {as: "vessel_req"})
    masterVessel.hasOne(models.viewEtiket, {as: "vessel_view"})
  }
  return masterVessel;
};