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
      requestContainer.belongsTo(models.request, {foreignKey: "ID_Request"})
    }
  }
  requestContainer.init({
    ID_Request: DataTypes.INTEGER,
    Container_Number: DataTypes.STRING,
    Iso_Code: DataTypes.STRING,
    Container_Type: DataTypes.STRING,
    Container_Size: DataTypes.STRING,
    Weight: DataTypes.INTEGER,
    Sling: DataTypes.STRING,
    MD: DataTypes.STRING,
    OD: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'requestContainer',
  });
  return requestContainer;
};