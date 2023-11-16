"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      booking.belongsTo(models.request, {
        foreignKey: "No_Request",
        as: "request",
      });
      booking.belongsTo(models.slot, {
        foreignKey: "ID_Booking_Slot",
        as: "mst_slot",
      });
      booking.hasOne(models.assignJob, { foreignKey: "ID_Booking" });
      booking.hasOne(models.viewEtiket, { as: "ID_Booking" });
    }
  }
  booking.init(
    {
      No_Request: DataTypes.STRING,
      ID_Booking_Slot: DataTypes.INTEGER,
      No_Booking: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "booking",
    }
  );
  return booking;
};
