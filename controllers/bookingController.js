const db = require("../models"); 

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

module.exports.searchBooking = async (req,res) => {
    try{
        const result = await Request.findAll({
            attributes: ['No_Request', 'createdAt'],
            where: {
                'ID_User': ID_User
            },
            include: [
                {
                    model: Vessel,
                    attributes: ['Vessel_Name', 'Closing_Time'],
                    where: {
                        
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
    }
    catch(error){

    }
}