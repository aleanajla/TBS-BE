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
      viewEtiket.belongsTo(models.request, { foreignKey: "ID_Request", as: "mst_request_view" })
      viewEtiket.belongsTo(models.booking, { foreignKey: "ID_Booking", as: "mst_booking_view" })
    
    }
  }
  viewEtiket.init({
    ID_Request: DataTypes.INTEGER,
    ID_Booking: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'viewEtiket',
  });
  return viewEtiket;
};