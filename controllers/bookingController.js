const { setDefaultHighWaterMark } = require("nodemailer/lib/xoauth2");
const db = require("../models");
const { Op, where, Model, Sequelize } = require("sequelize");

const Request = db.request;
const RequestContainer = db.requestContainer;
const Container = db.masterContainer;
const Trucking = db.masterCustomer;
const Slot = db.slot;
const detailSlot = db.detailSlot;
const Booking = db.booking;
const RequestTC = db.requestTruckingCompany;
const assignJob = db.assignJob;
const STID = db.masterSTID;
const Driver = db.masterDriver;

module.exports.viewRequest = async (req, res) => {
  const ID_Customer = req.params.id;
  const search = req.query.search;
  try {
    const request = await Request.findAll({
      attributes: [
        "id",
        "No_Request",
        "Qty",
        "Vessel_Name",
        "Port_Name",
        "Terminal_Name",
        "Service_Name",
        "createdAt",
        "Closing_Time",
      ],
      where: {
        [Op.and]: [
          { ID_Customer: ID_Customer },
          {
            No_Request: db.sequelize.where(
              db.sequelize.fn("lower", db.sequelize.col("No_Request")),
              {
                [Op.like]: `%${search}%`,
              }
            ),
          },
        ],
      },
    });

    const count = await Promise.all(request.map(getAssignJobCount));

    const resultRequest = []

    request.map((requests) => {
      count.map((counts) => {
        if(requests.id === counts.requestId){
          resultRequest.push({requests,counts})
        }
      })
    })

    res.status(200).send(resultRequest);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};

const getAssignJobCount = async (req) => {
  try {
    const result = await db.sequelize.query(
      'SELECT COUNT(*) FROM "assignJobs" aj ' +
      'JOIN "bookings" b ON aj."ID_Booking" = b."id" ' +
      'JOIN "requestContainers" rc ON rc."id" = b."ID_Request_Container" ' +
      'WHERE rc."ID_Request" = :requestId',
      {
        replacements: { requestId: req.id },
        type: db.sequelize.QueryTypes.SELECT,
      }
    );

    const count = parseInt(result[0].count, 10);

    return { requestId: req.id, count };
  } catch (error) {
    console.error("Error querying database:", error);
    throw error;
  }
};

module.exports.searchRequest = async (req, res) => {
  const { search, ID_Customer } = req.query;
  try {
    const result = await Request.findAll({
      attributes: [
        "No_Request",
        "Qty",
        "Vessel_Name",
        "Port_Name",
        "Terminal_Name",
        "Service_Name",
        "createdAt",
      ],
      where: {
        [Op.and]: [
          { ID_Customer: ID_Customer },
          {
            No_Request: db.sequelize.where(
              db.sequelize.fn("lower", db.sequelize.col("No_Request")),
              {
                [Op.like]: `%${search}%`,
              }
            ),
          },
        ],
      },
    });
    console.log(result);
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};

// view container
module.exports.viewContainer = async (req, res) => {
  const { ID_Request } = req.query;
  console.log(ID_Request, "id request");
  try {
    const resultContainer = await RequestContainer.findAll({
      attributes: ["id", "Container_Number"],
      where: {
        ID_Request: ID_Request,
      },
    });

    const resultBooking = await Booking.findAll({
      attributes: ["id"],
      include: [
        {
          model: RequestContainer,
          attributes: ["Container_Number"],
          where: {
            ID_Request: ID_Request,
          },
        },
        {
          model: detailSlot,
          attributes: ["Start", "End"],
          include: [
            {
              model: Slot,
              attributes: ["Date"]
            }
          ]
        },
      ],
    });

    const resultAssign = await Booking.findAll({
      attributes: ["id"],
      include: [
        {
          model: RequestContainer,
          attributes: ["Container_Number"],
          where: {
            ID_Request: ID_Request,
          },
        },
        {
          model: detailSlot,
          attributes: ["Start", "End"],
          include: [
            {
              model: Slot,
              attributes: ["Date"]
            }
          ]
        },
        {
          model: assignJob,
          attributes: ["id"],
          where: {
            id: {
              [Sequelize.Op.ne]: null
            }
          },
          include: [
            {
              model: STID,
              attributes: ["STID_Number"],
              include: [
                {
                  model: Driver,
                  attributes: ["Driver_Name"]
                }
              ] 
            }
          ]
        }
      ],
    });

    let mergedData = [];

    resultContainer.forEach((container) => {
      let bookingData = resultBooking.find(
        (booking) =>
          container.Container_Number ===
          booking.requestContainer.Container_Number
      );
      let assignJobData = resultAssign.find(
        (assignJob) =>
          container.Container_Number ===
          assignJob.requestContainer.Container_Number
      );

      if (assignJobData) {
        mergedData.push(assignJobData);
      } else if (bookingData) {
        mergedData.push(bookingData);
      } else {
        mergedData.push(container);
      }

    });

    let result = {
      mergedData
    };

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports.viewBooking = async (req, res) => {
  const { ID_Request } = req.query;
  try {
    const result = await Booking.findAll({
      attributes: ["id"],
      include: [
        {
          model: RequestContainer,
          attributes: ["Container_Number"],
          where: {
            ID_Request: ID_Request,
          },
        },
        {
          model: detailSlot,
          attributes: ["Start", "End"],
        },
      ],
    });

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

//new booking after jpt select TimeSlot
module.exports.newBooking = async (req, res) => {
  const { ID_Request_Container, ID_Request_TC, ID_Detail_Slot } = req.body;
  console.log(ID_Request_Container, ID_Request_TC, ID_Detail_Slot);
  let flag = 0;
  let No_Booking = null;
  try {
    do {
      const generateBookingNo = () => {
        const randomNumbers = Math.floor(100000 + Math.random() * 900000); // Generate 6 random digits
        No_Booking = `BK${randomNumbers}`;
        return No_Booking;
      };

      const searchBookingNo = await Booking.findOne({
        where: {
          No_Booking: generateBookingNo(),
        },
      });
      console.log(No_Booking);

      if (!searchBookingNo) {
        flag = 1;
        break;
      }
    } while (flag == 1);

    const createBooking = await Booking.create({
      ID_Request_TC,
      ID_Detail_Slot,
      ID_Request_Container,
      No_Booking,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const updateDetailSlot = await detailSlot.increment(
      {
        Booking_Qty: 1,
      },
      {
        attributes: [],
        where: {
          id: ID_Detail_Slot,
        },
      }
    );

    const viewBooking = await Booking.findOne({
      attributes: [],
      where: {
        No_Booking,
      },
      include: [
        {
          model: detailSlot,
          attributes: ["Start", "End"],
        },
      ],
    });

    res.status(200).send(viewBooking);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
