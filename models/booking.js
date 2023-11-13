'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  booking.init({
    User_ID: DataTypes.INTEGER,
    ID_Container: DataTypes.INTEGER,
    No_Request: DataTypes.STRING,
    ID_Booking_Slot: DataTypes.INTEGER,
    No_Booking: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'booking',
  });
  booking.associate = function (models) {
    booking.belongsTo(models.request, {foreignKey: "No_Request", as: "request"})
    booking.belongsTo(models.masterContainer, {foreignKey: "ID_Container", as: "mst_container_booking"})
    booking.belongsTo(models.masterUser, {foreignKey: "User_ID", as: "mst_user"})
    booking.belongsTo(models.slot, {foreignKey: "ID_Booking_Slot", as: "mst_slot"})
    booking.hasOne(models.assignJob, {as: "assign_booking"})
    booking.hasOne(models.viewEtiket, {as: "booking_view"})
  }
  return booking;
};