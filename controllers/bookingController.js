const { setDefaultHighWaterMark } = require("nodemailer/lib/xoauth2");
const db = require("../models");
const { Op, where } = require('sequelize');

const Request = db.request
const RequestContainer = db.requestContainer
const Container = db.masterContainer
const Trucking = db.masterCustomer
const Slot = db.slot
const RequestTC = db.requestTruckingCompany

module.exports.viewRequest = async (req, res) => {
    const ID_Customer = req.params.id
    const search = req.query.search
    try {
        // kurang buat ambil slot dan detail slot
        const request = await Request.findAll({
            attributes: ['id', 'No_Request', 'Qty', 'Vessel_Name', 'Port_Name', 'Terminal_Name', 'Service_Name', 'createdAt', 'Closing_Time'],
            where: {
                [Op.and]: [
                    { ID_Customer: ID_Customer },
                    {
                        No_Request: db.sequelize.where(db.sequelize.fn('lower', db.sequelize.col("No_Request")), {
                            [Op.like]: `%${search}%`
                        })
                    }
                ]
            }
        })

        res.status(200).send(request)
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message })
    }
}


module.exports.searchRequest = async (req, res) => {
    const { search, ID_Customer } = req.query
    try {
        const result = await Request.findAll({
            attributes: ['No_Request', 'Qty', 'Vessel_Name', 'Port_Name', 'Terminal_Name', 'Service_Name', 'createdAt'],
            where: {
                [Op.and]: [
                    { ID_Customer: ID_Customer },
                    {
                        No_Request: db.sequelize.where(db.sequelize.fn('lower', db.sequelize.col("No_Request")), {
                            [Op.like]: `%${search}%`
                        })
                    }
                ]
            }
        })
        console.log(result);
        res.status(200).send(result)
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message })
    }
}

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
    const { ID_Request } = req.query
    try {
        const result = await RequestContainer.findAll({
            attributes: ['id', 'Container_Number'],
            where: {
                ID_Request: ID_Request
            }
        })
        res.status(200).send(result)
    }
    catch (error) {
        res.status(500).send({ message: error.message })
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


