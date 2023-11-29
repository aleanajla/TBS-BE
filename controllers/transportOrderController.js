const db = require("../models");
const { Op } = require('sequelize');

const Request = db.request
const Vessel = db.masterVessel
const Service = db.masterService
const Port = db.masterPort
const Terminal = db.masterTerminal
const RequestContainer = db.requestContainer
const Container = db.masterContainer
const JPT = db.masterCustomer
const User = db.masterUser

module.exports.viewRequest = async(req, res) => {
  const {ID_Customer} = req.params
  try {
    
    res.status(200).send(result)
  } catch (error) {
    
    res.status(500).send({message : error.message})
  }
}

module.exports.filterJPT = async(req, res) => {
  const {ID_User, id} = req.query
  try {
    const result = await request.findAll({
      attributes: ['No_Request', 'createdAt'],
      where:{
        ID_User: ID_User
      },
      include:[
        {
          model: Vessel,
          attributes: ['']
        }
      ]
    })
    res.status(200).send(result)
  } catch (error) {
    res.status(500).send({message : error.message})
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
