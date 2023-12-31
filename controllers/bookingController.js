const { setDefaultHighWaterMark } = require("nodemailer/lib/xoauth2");
const db = require("../models");
const { Op, where, Model, Sequelize } = require("sequelize");

const Request = db.request;
// const Vessel = db.masterVessel
// const Service = db.masterService
// const Port = db.masterPort
// const Terminal = db.masterTerminal
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
    // kurang buat ambil slot dan detail slot
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

    res.status(200).send(request);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
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

// search by vessel
// module.exports.filterVessel = async (req, res) => {
//     const { ID_Customer, id } = req.query
//     try {
//         const result = await Request.findAll({
//             attributes: ['No_Request', 'createdAt'],
//             where: {
//                 ID_Customer
//             },
//             include: [
//                 {
//                     model: Vessel,
//                     attributes: ['Vessel_Name', 'Closing_Time'],
//                     where: {
//                         id: id
//                     }
//                 },
//                 {
//                     model: Service,
//                     attributes: ['Service_Name']
//                 },
//                 {
//                     model: Port,
//                     attributes: ['Port_Name']
//                 },
//                 {
//                     model: Terminal,
//                     attributes: ['Terminal_Name']
//                 }
//             ]
//         })
//         res.status(200).send(result)
//     }
//     catch (error) {
//         res.status(500).send({ message: error.message })
//     }
// }

// search by port
// module.exports.filterPort = async (req, res) => {
//     const { ID_User, id } = req.query
//     try {
//         const result = await Request.findAll({
//             attributes: ['No_Request', 'createdAt'],
//             where: {
//                 ID_User: ID_User
//             },
//             include: [
//                 {
//                     model: Vessel,
//                     attributes: ['Vessel_Name', 'Closing_Time'],
//                 },
//                 {
//                     model: Service,
//                     attributes: ['Service_Name']
//                 },
//                 {
//                     model: Port,
//                     attributes: ['Port_Name'],
//                     where: {
//                         id: id
//                     }
//                 },
//                 {
//                     model: Terminal,
//                     attributes: ['Terminal_Name']
//                 }
//             ]
//         })
//         res.status(200).send(result)
//     }
//     catch (error) {
//         res.status(500).send({ message: error.message })
//     }
// }

// search by terminal
// module.exports.filterTerminal = async (req, res) => {
//     const { ID_User, id } = req.query
//     try {
//         const result = await Request.findAll({
//             attributes: ['No_Request', 'createdAt'],
//             where: {
//                 ID_User: ID_User
//             },
//             include: [
//                 {
//                     model: Vessel,
//                     attributes: ['Vessel_Name', 'Closing_Time'],
//                 },
//                 {
//                     model: Service,
//                     attributes: ['Service_Name']
//                 },
//                 {
//                     model: Port,
//                     attributes: ['Port_Name'],
//                 },
//                 {
//                     model: Terminal,
//                     attributes: ['Terminal_Name'],
//                     where: {
//                         id: id
//                     }
//                 }
//             ]
//         })
//         res.status(200).send(result)
//     }
//     catch (error) {
//         res.status(500).send({ message: error.message })
//     }
// }

// search by service
// module.exports.filterService = async (req, res) => {
//     const { ID_Customer, id } = req.query
//     try {
//         const result = await Request.findAll({
//             attributes: ['No_Request', 'createdAt'],
//             where: {
//                 ID_Customer
//             },
//             include: [
//                 {
//                     model: Vessel,
//                     attributes: ['Vessel_Name', 'Closing_Time'],
//                 },
//                 {
//                     model: Service,
//                     attributes: ['Service_Name'],
//                     where: {
//                         id: id
//                     }
//                 },
//                 {
//                     model: Port,
//                     attributes: ['Port_Name']
//                 },
//                 {
//                     model: Terminal,
//                     attributes: ['Terminal_Name']
//                 }
//             ]
//         })
//         res.status(200).send(result)
//     }
//     catch (error) {
//         res.status(500).send({ message: error.message })
//     }
// }

// sort createdAt date
// module.exports.sortDate = async (req, res) => {
//     const { sort, ID_Customer } = req.query
//     try {
//         if (sort == 1) {
//             const result = await Request.findAll({
//                 attributes: ['No_Request', 'Qty', 'Vessel_Name', 'Port_Name', 'Terminal_Name', 'Service_Name', 'createdAt'],
//                 order: [['createdAt', 'DESC']],
//                 where: {
//                     ID_Customer
//                 }
//             })
//             res.status(200).send(result)
//         }

//         const result = await Request.findAll({
//             attributes: ['No_Request', 'Qty', 'Vessel_Name', 'Port_Name', 'Terminal_Name', 'Service_Name', 'createdAt'],
//             order: [['createdAt', 'ASC']],
//             where: {
//                 ID_Customer
//             }
//         })
//         res.status(200).send(result)
//     }
//     catch (error) {
//         res.status(500).send({ message: error.message })
//     }
// }

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

      // if (bookingData) {
      //   mergedData.push(bookingData);
      // } else {
      //   mergedData.push(container);
      // }
    });

    let result = {
      mergedData,
      // resultAssign
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

module.exports.countingContainer = async (req, res) => {
    const ID_Request = req.params.id;

    try {
        const counting = await RequestContainer.count({
            where: {
                ID_Request
            }
        })

        res.status(200).send({ totalContainer: counting });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

// view port
// module.exports.viewPort = async (req, res) => {
//     try {
//         const result = await Port.findAll({
//             attributes: ['id', 'Port_Name']
//         })
//         res.status(200).send(result)
//     }
//     catch (error) {
//         res.status(500).send({ message: error.message })
//     }
// }

// view terminal
// module.exports.viewTerminal = async (req, res) => {
//     try {
//         const result = await Terminal.findAll({
//             attributes: ['id', 'Terminal_Name']
//         })
//         res.status(200).send(result)
//     }
//     catch (error) {
//         res.status(500).send({ message: error.message })
//     }
// }

// view vessel
// module.exports.viewVessel = async (req, res) => {
//     try {
//         const result = await Vessel.findAll({
//             attributes: ['id', 'Vessel_Name']
//         })
//         res.status(200).send(result)
//     }
//     catch (error) {
//         res.status(500).send({ message: error.message })
//     }
// }

// view service
// module.exports.viewService = async (req, res) => {
//     const { ID_Customer } = req.params.ID_Customer
//     try {
//         const result = await Service.findAll({
//             attributes: ['id', 'Service_Name'],
//             where: {
//                 ID_Customer
//             }
//         })
//         res.status(200).send(result)
//     }
//     catch (error) {
//         res.status(500).send({ message: error.message })
//     }
// }

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

    // const payload = {
    //   Start: viewBooking.Start,
    //   End: viewBooking.End,
    // };

    res.status(200).send(viewBooking);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
