const db = require("../models");
const { Op } = require('sequelize');

const Request = db.request
const Vessel = db.masterVessel
const RequestTC = db.requestTruckingCompany

// view request
module.exports.viewRequestTP = async (req, res) => {
  const ID_Customer = req.params.id
  try {
    const result = await RequestTC.findAll({
      attributes: ['id', 'ID_Request'],
      include: [
        {
          model: Request,
          attributes: ['No_Request', 'Qty', 'Vessel_Name', 'Port_Name', 'Terminal_Name', 'Service_Name', 'createdAt', 'Closing_Time'],
          // where: {
          //   ID_Customer: ID_Customer
          // }
        }
      ],
      where: {
        ID_Customer,
        ID_Status: 1
      }
    })
    res.status(200).send(result)
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

//view cancelled
module.exports.viewCancelledTP = async (req, res) => {
  const ID_Customer = req.params.id
  try {
    const result = await RequestTC.findAll({
      attributes: ['id', 'ID_Request'],
      include: [
        {
          model: Request,
          attributes: ['No_Request', 'Qty', 'Vessel_Name', 'Port_Name', 'Terminal_Name', 'Service_Name', 'createdAt', 'Closing_Time'],
          // where: {
          //   ID_Customer
          // }
        }
      ],
      where: {
        ID_Customer,
        ID_Status: 3
      }
    })
    res.status(200).send(result)
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

module.exports.viewOnGoingTP = async (req, res) => {
  const ID_Customer = req.params.id
  try {
    const result = await RequestTC.findAll({
      attributes: ['id', 'ID_Request', 'ID_Status'],
      include: [
        {
          model: Request,
          attributes: ['No_Request', 'Qty', 'Vessel_Name', 'Port_Name', 'Terminal_Name', 'Service_Name', 'createdAt', 'Closing_Time'],
          where: {
            Closing_Time: {
              [Op.gt]: db.sequelize.literal('CURRENT_TIMESTAMP')
            }
          }
        }
      ],
      where: {
        ID_Customer,
        ID_Status: 2
      }
    })
    res.status(200).send(result)
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

//view complete
module.exports.viewCompletedTP = async (req, res) => {
  const ID_Customer = req.params.id
  try {
    const result = await RequestTC.findAll({
      attributes: ['id', 'ID_Request', 'ID_Status'],
      include: [
        {
          model: Request,
          attributes: ['No_Request', 'Qty', 'Vessel_Name', 'Port_Name', 'Terminal_Name', 'Service_Name', 'createdAt', 'Closing_Time'],
          where: {
            Closing_Time: {
              [Op.lt]: db.sequelize.literal('CURRENT_TIMESTAMP')
            }
          }
        }
      ],
      where: {
        ID_Customer,
        ID_Status: 2
      }
    })
    res.status(200).send(result)
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

module.exports.filterJPT = async (req, res) => {
  const { ID_User, id } = req.query
  try {
    const result = await request.findAll({
      attributes: ['No_Request', 'createdAt'],
      where: {
        ID_User: ID_User
      },
      include: [
        {
          model: Vessel,
          attributes: ['']
        }
      ]
    })
    res.status(200).send(result)
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}






















module.exports.viewFilterJPT = async (req, res) => {
  try {

  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports.filterJPT = async (req, res) => {
  try {

  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
