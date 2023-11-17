const db = require("../models"); 
const { Op } = require('sequelize');

const Request = db.request
const Vessel = db.masterVessel
const Service = db.masterService
const Port = db.masterPort
const Terminal = db.masterTerminal

module.exports.viewRequest = async (req,res) => {
    const {ID_User} = req.body
    try{
        // kurang buat ambil slot dan detail slot
        const result = await Request.findAll({
            attributes: ['No_Request', 'createdAt'],
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

        console.log(result);
        res.status(200).send(result)
    }
    catch(error) {
        console.log(error);
        res.status(500).send({message : error.message})
    }
}

// search request -> no request only
module.exports.searchRequest = async (req,res) => {
    const {search, ID_User} = req.body
    try{
        const result = await Request.findAll({
            attributes: ['No_Request', 'createdAt'],
            where: {
                [Op.or]: [
                    { ID_User: ID_User },
                    { No_Request: db.sequelize.where(db.sequelize.fn('lower', db.sequelize.col("No_Request")),{
                        [Op.like]: `%${search}%`
                    })}
                ]
            },
            include: [
                {
                    model: Vessel,
                    attributes: ['Vessel_Name', 'Closing_Time'],
                    where: {
                        [Op.or]: [
                            {Vessel_Name: db.sequelize.where(db.sequelize.fn('lower', db.sequelize.col("Vessel_Name")), {
                                [Op.like]: `%${search}%`
                            })}
                        ]
                    }
                },
                {
                    model: Service,
                    attributes: ['Service_Name'],
                    where: {
                        [Op.or]: [
                       {     Service_Name: db.sequelize.where(db.sequelize.fn('lower', db.sequelize.col("Service_Name")), {
                                [Op.like]: `%${search}%`
                            })}
                        ]
                    }
                },
                {
                    model: Port,
                    attributes: ['Port_Name'],
                    where: {
                        [Op.or]: [
                            {Port_Name: db.sequelize.where(db.sequelize.fn('lower', db.sequelize.col("Port_Name")), {
                                [Op.like]: `%${search}%`
                            })}
                        ]
                    }
                },
                {
                    model: Terminal,
                    attributes: ['Terminal_Name'],
                    where: {
                        [Op.or]: [
                            {Terminal_Name: db.sequelize.where(db.sequelize.fn('lower', db.sequelize.col("Terminal_Name")), {
                                [Op.like]: `%${search}%`
                            })}
                        ]
                    }
                }
            ]
        })
        console.log(result);
        res.status(200).send(result)
    }
    catch(error){
        console.log(error);
        res.status(500).send({message : error.message})
    }
}

// search by vessel
module.exports.filterVessel = async (req,res) => {
    try{

    }
    catch (error) {

    }
}

// search by port
module.exports.filterPort = async (req,res) => {
    try{

    }
    catch{

    }
}

// search by terminal
module.exports.filterTerminal = async (req,res) => {
    try{

    }
    catch{

    }
}

// search by service
module.exports.filterService = async (req,res) => {
    try{

    }
    catch{
        
    }
}