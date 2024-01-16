const { setDefaultHighWaterMark } = require("nodemailer/lib/xoauth2");
const db = require("../models");
const { Op, where } = require('sequelize');

const Booking = db.booking
const detailSlot = db.detailSlot

module.exports.newBooking = async (req, res) => {
    const { ID_Request_Container, ID_Request_TC, ID_Detail_Slot } = req.body
    let flag = 0
    let No_Booking = null
    try {
        do {
            const generateBookingNo = () => {
                const randomNumbers = Math.floor(100000 + Math.random() * 900000); // Generate 6 random digits
                No_Booking = `BK${randomNumbers}`
                return No_Booking;
            };

            const searchBookingNo = await Booking.findOne({
                where: {
                    No_Booking: generateBookingNo()
                }
            })
            console.log(No_Booking)

            if (!searchBookingNo) {
                flag = 1;
                break;
            }
        } while (flag == 1);

        const createBooking = await Booking.create({
            ID_Request_TC,
            ID_Detail_Slot,
            ID_Request_Container,
            No_Booking
        })

        const updateDetailSlot = await detailSlot.increment({
            Booking_Qty: 1
        }, {
            where: {
                id: ID_Detail_Slot
            }
        })

        res.status(200).send("Booking Successfully created!")
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

// Edit Timeslot
module.exports.editTimeslot = async (req, res) => {
    const { ID_Booking, New_Timeslot } = req.body
    console.log(ID_Booking, "ID Booking")
    console.log(New_Timeslot, "New Time Slot")
    try {

        const findOldTimeslot = await Booking.findOne({
            attributes: ['ID_Detail_Slot'],
            where: { id: ID_Booking }
        });
        
        const oldTimeslot = findOldTimeslot ? findOldTimeslot.dataValues.ID_Detail_Slot : null;
        console.log(oldTimeslot);

        const updateOldTimeslot = await detailSlot.decrement({
            Booking_Qty: 1
        }, {
            where:{
                id: oldTimeslot
            }
        })

        const updateNewDetailSlot = await detailSlot.increment({
            Booking_Qty: 1
        }, {
            where: {
                id: New_Timeslot
            }
        })

        const updateTimeslot = await Booking.update({
            ID_Detail_Slot : New_Timeslot
        }, {
            where : {
                id : ID_Booking
            }
        })

        res.status(200).send("Timeslot Successfully Updated!")
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}