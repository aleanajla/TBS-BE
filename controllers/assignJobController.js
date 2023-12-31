const db = require("../models");
const { Op } = require('sequelize');
const Trucking = db.masterCustomer
const RequestTC = db.requestTruckingCompany
const Status = db.masterStatus
const assignJob = db.assignJob
const stid = db.masterSTID
const Truck = db.masterTruck
const Driver = db.masterDriver
const Booking = db.booking
const DetailSlot = db.detailSlot
const Slot = db.slot
const RequestContainer = db.requestContainer
const Request = db.request
const Customer = db.masterCustomer

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

module.exports.viewRequestTruckingCompany = async (req, res) => {
    const id = req.params.id
    console.log(id,"id");
    try {
        const view = await RequestTC.findOne({
            attributes: ['id', 'ID_Status', 'ID_Request'],
            where: {
                ID_Request: id
            },
            order: [['createdAt', 'DESC']],
            limit: 1,
            include: [
                {
                    model: Trucking,
                    attributes: ['id','Company_Name']
                },
                {
                    model: Status,
                    attributes: ['Status_Name']
                }
            ]
        })

        const payload = {
            id: view.id,
            ID_Status: view.ID_Status,
            ID_Request: view.ID_Request,
            Customer_Name: view.masterCustomer.Company_Name,
            Status_Name: view.masterStatus.Status_Name,
            ID_Trucking : view.masterCustomer.id
        }

        res.status(200).send(payload)
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

// TCA
module.exports.tca = async (req, res) => {
    const { ID_Booking, ID_STID } = req.body

    console.log(ID_Booking, ID_STID)

    try {
        const createTCA = await assignJob.create({
            ID_Booking,
            ID_STID,
            createdAt: new Date(),
            updatedAt: new Date()
        })

        // const viewTCA = await assignJob.findOne({
        //     attributes: ["id"],
        //     where: {
        //         ID_Booking
        //     },
        //     include: [
        //         {
        //             model: Booking,
        //             attributes: ["No_Booking"],
        //         },
        //         {
        //             model: stid,
        //             attributes: ["STID_Number"],
        //             include: [
        //                 {
        //                     model: Driver,
        //                     attributes: ["Driver_Name"]
        //                 },
        //                 {
        //                     model: Truck,
        //                     attributes: ["Plat_Number"]
        //                 }
        //             ]
        //         }
        //     ]
        // });
    
        res.status(200).json("TCA Successfully Created");
    } catch (error) {
        res.status(500).send({ message: error.message })
    }

}

// view e-ticket

module.exports.viewTicket = async (req, res)=>{
    const id = req.params.id

    try {
        const viewData = await assignJob.findOne({
            where:{
                ID_Booking : id
            },
            include : [
                {
                    model : Booking,
                    attributes : ["No_Booking"],
                    include : [
                        {
                            model : DetailSlot,
                            attributes : ["Start", "End"],
                            include : [
                                {
                                    model : Slot,
                                    attributes : ["Date"]
                                }
                            ]
                        },
                        {
                            model : RequestContainer,
                            attributes : ["Container_Number", "Container_Type", "Container_Size", "OD", "Weight", "Sling"],
                            include : [
                                {
                                    model : Request,
                                    include : [
                                        {
                                            model : Customer,
                                            attributes : ["Company_Name"]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        })

        res.status(200).send(viewData)
    } catch (error) {
        res.status(500).send({ message: error.message })

    }
}

