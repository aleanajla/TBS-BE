const db = require("../models");
const { Op } = require('sequelize');
const Trucking = db.masterCustomer
const RequestTC = db.requestTruckingCompany

// view trucking company
module.exports.viewTruckingCompany = async (req, res) => {
    try {
        const result = await Trucking.findAll({
            attributes: ['id', 'Company_Name'],
            where: {
                Company_Type: 'Trucking Company'
            }
        })
        res.status(200).send(result)
    }
    catch (error) {
        res.status(500).send({ message: error.message })
    }
}

// search trucking company
module.exports.searchTruckingCompany = async (req, res) => {
    const { searchTC } = req.query
    try {
        const search = await Trucking.findAll({
            attributes: ['id', 'Company_Name'],
            where: {
                Company_Name: db.sequelize.where(db.sequelize.fn('lower', db.sequelize.col("Company_Name")), {
                    [Op.like]: `%${searchTC}%`
                })
            }
        })

        console.log(search)
        res.status(200).send(search);
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

// click send assignJob
module.exports.createRequestTC = async (req, res) => {
    const { ID_Customer, ID_Request } = req.body
    console.log(req.body)
    try {
        const create = await RequestTC.create({
            ID_Customer,
            ID_Status: 1,
            ID_Request
        })


        res.status(200).send(create)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

// Accept job
module.exports.acceptAssignJob = async (req, res) => {
    const id = req.params.id
    console.log(id)
    try {
        const update = await RequestTC.update({
            ID_Status: 2
        }, {
            where: {
                id
            }
        })

        const updatedData = await RequestTC.findOne({
            where: {
                id
            }
        })

        res.status(200).send(updatedData)

    } catch (error) {

        res.status(500).send({ message: error.message })
    }
}

module.exports.viewRequestTruckingCompany = async ( req, res) => {
    const id = req.params.id
    try {
        const view = await RequestTC.findOne({
            where:{
                id
            }
        })

        res.status(200).send(view)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

// Reject Job
module.exports.rejectAssignJob = async (req, res) => {
    const id = req.params.id
    console.log(id)
    try {
        const update = await RequestTC.update({
            ID_Status: 3
        }, {
            where: {
                id
            }
        })

        const updatedData = await RequestTC.findOne({
            where: {
                id
            }
        })
        
        res.status(200).send(updatedData)

    } catch (error) {

        res.status(500).send({ message: error.message })
    }
}

