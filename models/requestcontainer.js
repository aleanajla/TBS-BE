'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class requestContainer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      requestContainer.belongsTo(models.masterContainer, {foreignKey: "ID_Container"})
      requestContainer.belongsTo(models.request, {foreignKey: "ID_Request"})
    }
  }
  requestContainer.init({
    ID_Container: DataTypes.INTEGER,
    ID_Request: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'requestContainer',
  });
  return requestContainer;
};