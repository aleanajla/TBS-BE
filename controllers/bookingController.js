const db = require("../models");
const { Op } = require('sequelize');

const Request = db.request
const Vessel = db.masterVessel
const Service = db.masterService
const Port = db.masterPort
const Terminal = db.masterTerminal
const RequestContainer = db.requestContainer
const Container = db.masterContainer
const Trucking = db.masterCustomer
const Slot = db.slot 
const detailSlot = db.detailSlot
const Booking = db.booking

module.exports.viewRequest = async (req, res) => {
    const { ID_User } = req.body
    try {
        // kurang buat ambil slot dan detail slot
        const request = await Request.findAll({
            attributes: ['No_Request', 'createdAt', 'Qty'],
            where: {
                'ID_User': ID_User
            },
            include: [
                {
                    model: Vessel,
                    attributes: ['Vessel_Name', 'Closing_Time']
                },
                {
                    model: Service,
                    attributes: ['Service_Name']
                },
                {
                    model: Port,
                    attributes: ['Port_Name']
                },
                {
                    model: Terminal,
                    attributes: ['Terminal_Name']
                }
            ]
        }) 

        res.status(200).send(request)
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message })
    }
}


// search request -> no request only
module.exports.searchRequest = async (req, res) => {
    const { search, ID_User } = req.query
    try {
        const result = await Request.findAll({
            attributes: ['No_Request', 'createdAt'],
            where: {
                [Op.and]: [
                    { ID_User: ID_User },
                    {
                        No_Request: db.sequelize.where(db.sequelize.fn('lower', db.sequelize.col("No_Request")), {
                            [Op.like]: `%${search}%`
                        })
                    }
                ]
            },
            include: [
                {
                    model: Vessel,
                    attributes: ['Vessel_Name', 'Closing_Time']
                },
                {
                    model: Service,
                    attributes: ['Service_Name'],
                },
                {
                    model: Port,
                    attributes: ['Port_Name'],
                },
                {
                    model: Terminal,
                    attributes: ['Terminal_Name'],
                }
            ]
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
module.exports.filterVessel = async (req, res) => {
    const { ID_User, id } = req.query
    try {
        const result = await Request.findAll({
            attributes: ['No_Request', 'createdAt'],
            where: {
                ID_User: ID_User
            },
            include: [
                {
                    model: Vessel,
                    attributes: ['Vessel_Name', 'Closing_Time'],
                    where: {
                        id: id
                    }
                },
                {
                    model: Service,
                    attributes: ['Service_Name']
                },
                {
                    model: Port,
                    attributes: ['Port_Name']
                },
                {
                    model: Terminal,
                    attributes: ['Terminal_Name']
                }
            ]
        })
        res.status(200).send(result)
    }
    catch (error) {
        res.status(500).send({ message: error.message })
    }
}

// search by port
module.exports.filterPort = async (req, res) => {
    const { ID_User, id } = req.query
    try {
        const result = await Request.findAll({
            attributes: ['No_Request', 'createdAt'],
            where: {
                ID_User: ID_User
            },
            include: [
                {
                    model: Vessel,
                    attributes: ['Vessel_Name', 'Closing_Time'],
                },
                {
                    model: Service,
                    attributes: ['Service_Name']
                },
                {
                    model: Port,
                    attributes: ['Port_Name'],
                    where: {
                        id: id
                    }
                },
                {
                    model: Terminal,
                    attributes: ['Terminal_Name']
                }
            ]
        })
        res.status(200).send(result)
    }
    catch (error) {
        res.status(500).send({ message: error.message })
    }
}

// search by terminal
module.exports.filterTerminal = async (req, res) => {
    const { ID_User, id } = req.query
    try {
        const result = await Request.findAll({
            attributes: ['No_Request', 'createdAt'],
            where: {
                ID_User: ID_User
            },
            include: [
                {
                    model: Vessel,
                    attributes: ['Vessel_Name', 'Closing_Time'],
                },
                {
                    model: Service,
                    attributes: ['Service_Name']
                },
                {
                    model: Port,
                    attributes: ['Port_Name'],
                },
                {
                    model: Terminal,
                    attributes: ['Terminal_Name'],
                    where: {
                        id: id
                    }
                }
            ]
        })
        res.status(200).send(result)
    }
    catch (error) {
        res.status(500).send({ message: error.message })
    }
}

// search by service
module.exports.filterService = async (req, res) => {
    const { ID_User, id } = req.query
    try {
        const result = await Request.findAll({
            attributes: ['No_Request', 'createdAt'],
            where: {
                ID_User: ID_User
            },
            include: [
                {
                    model: Vessel,
                    attributes: ['Vessel_Name', 'Closing_Time'],
                },
                {
                    model: Service,
                    attributes: ['Service_Name'],
                    where: {
                        id: id
                    }
                },
                {
                    model: Port,
                    attributes: ['Port_Name']
                },
                {
                    model: Terminal,
                    attributes: ['Terminal_Name']
                }
            ]
        })
        res.status(200).send(result)
    }
    catch (error) {
        res.status(500).send({ message: error.message })
    }
}

// sort createdAt date
module.exports.sortDate = async (req, res) => {
    const { sort, ID_User } = req.query
    try {
        if (sort == 1) {
            const result = await Request.findAll({
                attributes: ['No_Request', 'createdAt'],
                order: [['createdAt', 'DESC']],
                where: {
                    ID_User: ID_User
                },
                include: [
                    {
                        model: Vessel,
                        attributes: ['Vessel_Name', 'Closing_Time'],
                    },
                    {
                        model: Service,
                        attributes: ['Service_Name']
                    },
                    {
                        model: Port,
                        attributes: ['Port_Name']
                    },
                    {
                        model: Terminal,
                        attributes: ['Terminal_Name']
                    }
                ]
            })
            res.status(200).send(result)
        }
        const result = await Request.findAll({
            attributes: ['No_Request', 'createdAt'],
            order: [['createdAt', 'ASC']],
            where: {
                ID_User: ID_User
            },
            include: [
                {
                    model: Vessel,
                    attributes: ['Vessel_Name', 'Closing_Time'],
                },
                {
                    model: Service,
                    attributes: ['Service_Name']
                },
                {
                    model: Port,
                    attributes: ['Port_Name']
                },
                {
                    model: Terminal,
                    attributes: ['Terminal_Name']
                }
            ]
        })

        res.status(200).send(result)
    }
    catch (error) {
        res.status(500).send({ message: error.message })
    }
}

// view container
module.exports.viewContainer = async (req, res) => {
    const { ID_User, ID_Request } = req.query
    try {
        const result = await RequestContainer.findAll({
            attributes: ['id'],
            include: [
                {
                    model: Request,
                    where: {
                        [Op.and]: [
                            { ID_User: ID_User },
                            { id: ID_Request }
                        ]
                    },
                    attributes: []
                },
                {
                    model: Container,
                    attributes: ['Container_Number']
                }
            ]
        })
        res.status(200).send(result)
    }
    catch (error) {
        res.status(500).send({ message: error.message })
    }
}


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

// view port
module.exports.viewPort = async (req, res) => {
    try {
        const result = await Port.findAll({
            attributes: ['id', 'Port_Name']
        })
        res.status(200).send(result)
    }
    catch (error) {
        res.status(500).send({ message: error.message })
    }
}

// view terminal
module.exports.viewTerminal = async (req, res) => {
    try {
        const result = await Terminal.findAll({
            attributes: ['id', 'Terminal_Name']
        })
        res.status(200).send(result)
    }
    catch (error) {
        res.status(500).send({ message: error.message })
    }
}

// view vessel
module.exports.viewVessel = async (req, res) => {
    try {
        const result = await Vessel.findAll({
            attributes: ['id', 'Vessel_Name']
        })
        res.status(200).send(result)
    }
    catch (error) {
        res.status(500).send({ message: error.message })
    }
}

// view service
module.exports.viewService = async (req, res) => {
    try {
        const result = await Service.findAll({
            attributes: ['id', 'Service_Name']
        })
        res.status(200).send(result)
    }
    catch (error) {
        res.status(500).send({ message: error.message })
    }
}

//assign trucking company
module.exports.assignTruckingCompany = async (req, res) => {
    const { id } = req.body

    try {
        const assignTC = await booking.create({
            
        })
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

//new booking after req acc by tc
module.exports.newBooking = async (req, res) => {
    try {

    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}