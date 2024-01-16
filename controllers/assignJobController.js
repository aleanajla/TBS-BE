const db = require("../models");
const { Op, where } = require("sequelize");
const Trucking = db.masterCustomer;
const RequestTC = db.requestTruckingCompany;
const Status = db.masterStatus;
const assignJob = db.assignJob;
const stid = db.masterSTID;
const Truck = db.masterTruck;
const Driver = db.masterDriver;
const Booking = db.booking;
const DetailSlot = db.detailSlot;
const Slot = db.slot;
const RequestContainer = db.requestContainer;
const Request = db.request;
const Customer = db.masterCustomer;
const qrcode = require("qrcode");

// view trucking company
module.exports.viewTruckingCompany = async (req, res) => {
  try {
    const result = await Trucking.findAll({
      attributes: ["id", "Company_Name"],
      where: {
        Company_Type: "Trucking Company",
      },
    });
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// search trucking company
module.exports.searchTruckingCompany = async (req, res) => {
  const { searchTC } = req.query;
  try {
    const search = await Trucking.findAll({
      attributes: ["id", "Company_Name"],
      where: {
        Company_Name: db.sequelize.where(
          db.sequelize.fn("lower", db.sequelize.col("Company_Name")),
          {
            [Op.like]: `%${searchTC}%`,
          }
        ),
      },
    });

    console.log(search);
    res.status(200).send(search);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// click send assignJob
module.exports.createRequestTC = async (req, res) => {
  const { ID_Customer, ID_Request } = req.body;
  console.log(req.body);
  try {
    const create = await RequestTC.create({
      ID_Customer,
      ID_Status: 1,
      ID_Request,
    });

    res.status(200).send(create);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Accept job
module.exports.acceptAssignJob = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const update = await RequestTC.update(
      {
        ID_Status: 2,
      },
      {
        where: {
          id,
        },
      }
    );

    const updatedData = await RequestTC.findOne({
      where: {
        id,
      },
    });

    res.status(200).send(updatedData);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports.viewRequestTruckingCompany = async (req, res) => {
  const id = req.params.id;
  console.log(id, "id");
  try {
    const view = await RequestTC.findOne({
      attributes: ["id", "ID_Status", "ID_Request"],
      where: {
        ID_Request: id,
      },
      order: [["createdAt", "DESC"]],
      limit: 1,
      include: [
        {
          model: Trucking,
          attributes: ["id", "Company_Name"],
        },
        {
          model: Status,
          attributes: ["Status_Name"],
        },
      ],
    });

    const payload = {
      id: view.id,
      ID_Status: view.ID_Status,
      ID_Request: view.ID_Request,
      Customer_Name: view.masterCustomer.Company_Name,
      Status_Name: view.masterStatus.Status_Name,
      ID_Trucking: view.masterCustomer.id,
    };

    res.status(200).send(payload);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Reject Job
module.exports.rejectAssignJob = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const update = await RequestTC.update(
      {
        ID_Status: 3,
      },
      {
        where: {
          id,
        },
      }
    );

    const updatedData = await RequestTC.findOne({
      where: {
        id,
      },
    });

    res.status(200).send(updatedData);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// TCA
module.exports.tca = async (req, res) => {
  const { ID_Booking, ID_STID } = req.body;

  console.log(ID_Booking, ID_STID);

  try {
    const createTCA = await assignJob.create({
      ID_Booking,
      ID_STID,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    res.status(200).json("TCA Successfully Created");
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports.editTCA = async (req, res) => {
  const { ID_AssignJob, New_STID } = req.body;
  console.log(ID_AssignJob, "ID_AssignJob");
  console.log(New_STID, "ID_STID");
  console.log(req.body);

  try {
    const updateAssignJob = await assignJob.update(
      {
        ID_STID: New_STID,
      },
      {
        where: {
          id: ID_AssignJob,
        },
      }
    );

    res.status(200).send("STID and Driver Successfully Updated!");
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// view e-ticket

module.exports.viewTicket = async (req, res) => {
  const id = req.params.id;

  try {
    const viewData = await assignJob.findOne({
      where: {
        ID_Booking: id,
      },
      include: [
        {
          model: Booking,
          attributes: ["No_Booking"],
          include: [
            {
              model: DetailSlot,
              attributes: ["Start", "End"],
              include: [
                {
                  model: Slot,
                  attributes: ["Date"],
                },
              ],
            },
            {
              model: RequestContainer,
              attributes: [
                "Container_Number",
                "Container_Type",
                "Container_Size",
                "OD",
                "Weight",
                "Sling",
              ],
              include: [
                {
                  model: Request,
                  include: [
                    {
                      model: Customer,
                      attributes: ["Company_Name"],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          model: stid,
          attributes: ["STID_Number"],
          include: [
            {
              model: Driver,
              attributes: ["Driver_Name"],
            },
            {
              model: Truck,
              attributes: ["Plat_Number", "Size"],
            },
          ],
        },
      ],
    });

    const payload = {
      id: viewData.id,
      ID_Booking: viewData.ID_Booking,
      ID_STID: viewData.ID_STID,
      No_Booking: viewData.booking.No_Booking,
      Start_Timeslot: viewData.booking.detailSlot.Start,
      End_Timeslot: viewData.booking.detailSlot.End,
      Date: viewData.booking.detailSlot.slot.Date,
      Container_Number: viewData.booking.requestContainer.Container_Number,
      Container_Type: viewData.booking.requestContainer.Container_Type,
      Container_Size: viewData.booking.requestContainer.Container_Size,
      OD: viewData.booking.requestContainer.OD,
      Weight: viewData.booking.requestContainer.Weight,
      Sling: viewData.booking.requestContainer.Sling,
      No_Request: viewData.booking.requestContainer.request.No_Request,
      Vessel_Name: viewData.booking.requestContainer.request.Vessel_Name,
      Port_Name: viewData.booking.requestContainer.request.Port_Name,
      Terminal_Name: viewData.booking.requestContainer.request.Terminal_Name,
      Service_Name: viewData.booking.requestContainer.request.Service_Name,
      Commodity_Name: viewData.booking.requestContainer.request.Commodity_Name,
      IO_Type: viewData.booking.requestContainer.request.IO_Type,
      Qty: viewData.booking.requestContainer.request.Qty,
      POD: viewData.booking.requestContainer.request.POD,
      FPOD: viewData.booking.requestContainer.request.FPOD,
      Commodity_Name: viewData.booking.requestContainer.request.Commodity_Name,
      Company_Name:viewData.booking.requestContainer.request.masterCustomer.Company_Name,
      Closing_Time: viewData.booking.requestContainer.request.Closing_Time,
      STID_Number: viewData.masterSTID.STID_Number,
      Driver_Name: viewData.masterSTID.masterDriver.Driver_Name,
      Plat_Number: viewData.masterSTID.masterTruck.Plat_Number,
      Size_Truck: viewData.masterSTID.masterTruck.Size,
    };
    res.status(200).send(payload);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports.generateQr = async (req, res) => {
  const ID_Booking  = req.query.ID_Booking;
  try {
    const payload = ID_Booking.toString();
    const dataString = JSON.stringify(payload);

    const qrCodeDataURL = await qrcode.toDataURL(dataString);

    res.send(qrCodeDataURL);
  } catch (error) {
    console.error("Error generating QR code:", error);
    res.status(500).send("Internal Server Error");
  }
};
