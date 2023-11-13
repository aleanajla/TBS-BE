'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class masterContType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      masterContType.hasOne(master.masterContainer, {foreignKey: "ID_Cont_Type"})
    }
  }
  masterContType.init({
    Cont_Type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'masterContType',
  });
  return masterContType;
};