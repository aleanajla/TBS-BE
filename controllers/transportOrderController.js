const db = require("../models");
const { Op } = require("sequelize");

const Request = db.request;
const Vessel = db.masterVessel;
const RequestTC = db.requestTruckingCompany;

// view request
module.exports.viewRequestTP = async (req, res) => {
  const ID_Customer = req.params.id;
  const search = req.query.search;

  try {
    const result = await RequestTC.findAll({
      attributes: ["id", "ID_Request"],
      include: [
        {
          model: Request,
          attributes: [
            "No_Request",
            "Qty",
            "Vessel_Name",
            "Port_Name",
            "Terminal_Name",
            "Service_Name",
            "createdAt",
            "Closing_Time",
          ],
          // where: {
          //   ID_Customer: ID_Customer
          // }
        },
      ],
      where: {
        ID_Customer,
        ID_Status: 1,
        No_Request: db.sequelize.where(
          db.sequelize.fn("lower", db.sequelize.col("No_Request")),
          {
            [Op.like]: `%${search}%`,
          }
        ),
      },
    });
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

//view cancelled
module.exports.viewCancelledTP = async (req, res) => {
  const ID_Customer = req.params.id;
  const search = req.query.search;

  try {
    const result = await RequestTC.findAll({
      attributes: ["id", "ID_Request"],
      include: [
        {
          model: Request,
          attributes: [
            "No_Request",
            "Qty",
            "Vessel_Name",
            "Port_Name",
            "Terminal_Name",
            "Service_Name",
            "createdAt",
            "Closing_Time",
          ],
          // where: {
          //   ID_Customer
          // }
        },
      ],
      where: {
        ID_Customer,
        ID_Status: 3,
        No_Request: db.sequelize.where(
          db.sequelize.fn("lower", db.sequelize.col("No_Request")),
          {
            [Op.like]: `%${search}%`,
          }
        ),
      },
    });
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports.viewOnGoingTP = async (req, res) => {
  const ID_Customer = req.params.id;
  const search = req.query.search;

  try {
    const result = await RequestTC.findAll({
      attributes: ["id", "ID_Request", "ID_Status"],
      include: [
        {
          model: Request,
          attributes: [
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
            Closing_Time: {
              [Op.gt]: db.sequelize.literal("CURRENT_TIMESTAMP"),
            },
          },
        },
      ],
      where: {
        ID_Customer,
        ID_Status: 2,
        No_Request: db.sequelize.where(
          db.sequelize.fn("lower", db.sequelize.col("No_Request")),
          {
            [Op.like]: `%${search}%`,
          }
        ),
      },
    });
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

//view complete
module.exports.viewCompletedTP = async (req, res) => {
  const ID_Customer = req.params.id;
  const search = req.query.search;

  try {
    const result = await RequestTC.findAll({
      attributes: ["id", "ID_Request", "ID_Status"],
      include: [
        {
          model: Request,
          attributes: [
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
            Closing_Time: {
              [Op.lt]: db.sequelize.literal("CURRENT_TIMESTAMP"),
            },
          },
        },
      ],
      where: {
        ID_Customer,
        ID_Status: 2,
        No_Request: db.sequelize.where(
          db.sequelize.fn("lower", db.sequelize.col("No_Request")),
          {
            [Op.like]: `%${search}%`,
          }
        ),
      },
    });
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

//counting request
module.exports.countingRequest = async (req, res) => {
  const ID_Customer = req.params.id;

  try {
    const counting = await RequestTC.count({
      where: {
        ID_Customer,
        ID_Status: 1
      },
    });
    res.status(200).send({ totalRequest: counting });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

//counting cancelled
module.exports.countingRejected = async (req, res) => {
  const ID_Customer = req.params.id;

  try {
    const counting = await RequestTC.count({
      where: {
        ID_Customer,
        ID_Status: 3,
      },
    });
    res.status(200).send({ totalRejected: counting });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

//counting onGoing
module.exports.countingOnGoing = async (req, res) => {
  const ID_Customer = req.params.id;

  try {
    const counting = await RequestTC.count({
      include: [
        {
          model: Request,
          attributes: [],
          where: {
            Closing_Time: {
              [Op.gt]: db.sequelize.literal("CURRENT_TIMESTAMP"),
            },
          },
        },
      ],
      where: {
        ID_Customer,
        ID_Status: 2
      },
    });
    res.status(200).send({ totalOnGoing: counting });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

//counting onGoing
module.exports.countingCompleted = async (req, res) => {
  const ID_Customer = req.params.id;

  try {
    const counting = await RequestTC.count({
      include: [
        {
          model: Request,
          attributes: [],
          where: {
            Closing_Time: {
              [Op.lt]: db.sequelize.literal("CURRENT_TIMESTAMP"),
            },
          },
        },
      ],
      where: {
        ID_Customer,
        ID_Status: 2,
      },
    });
    res.status(200).send({ totalCompleted: counting });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports.filterJPT = async (req, res) => {
  const { ID_User, id } = req.query;
  try {
    const result = await request.findAll({
      attributes: ["No_Request", "createdAt"],
      where: {
        ID_User: ID_User,
      },
      include: [
        {
          model: Vessel,
          attributes: [""],
        },
      ],
    });
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
