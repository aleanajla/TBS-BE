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
      // booking.belongsTo(models.request, {
      //   foreignKey: "No_Request",
      //   as: "request",
      // });
      // booking.belongsTo(models.masterCustomer, {
      //   foreignKey: "Customer_ID"
      // })
      // as: "mst_slot",
      booking.belongsTo(models.slot, {
        foreignKey: "ID_Detail_Slot"
      });
      booking.belongsTo(models.requestTruckingCompany, { foreignKey: "ID_Request_TC" })
      booking.hasOne(models.assignJob, { foreignKey: "ID_Booking" });
      booking.hasOne(models.viewEtiket, { as: "ID_Booking" });
      booking.belongsTo(models.detailSlot, {foreignKey: "ID_Detail_Slot"})
    }
  }
  booking.init(
    {
      // No_Request: DataTypes.STRING,
      // Customer_ID: DataTypes.INTEGER,
      ID_Request_TC: DataTypes.INTEGER,
      ID_Detail_Slot: DataTypes.INTEGER,
      No_Booking: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "booking",
    }
  );
  return booking;
};
