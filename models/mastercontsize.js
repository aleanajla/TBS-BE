'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class masterContSize extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      masterContSize.hasOne(models.masterContainer, {foreignKey: "ID_Cont_Size"})
    }
  }
  masterContSize.init({
    Cont_Size: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'masterContSize',
  });
  return masterContSize;
};