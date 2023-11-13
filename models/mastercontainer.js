'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class masterContainer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  masterContainer.init({
    Container_Number: DataTypes.INTEGER,
    Iso_Code: DataTypes.STRING,
    Sling: DataTypes.STRING,
    MD: DataTypes.STRING,
    OD: DataTypes.STRING,
    Cont_Size: DataTypes.INTEGER,
    Cont_type: DataTypes.STRING,
    Weight: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'masterContainer',
  });
  masterContainer.associate = function (models) {
    masterContainer.hasMany(models.booking, {as: "container_booking"})
    masterContainer.hasOne(models.viewEtiket, {as: "container_view"})
  }
  return masterContainer;
};