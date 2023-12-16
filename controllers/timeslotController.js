const { setDefaultHighWaterMark } = require("nodemailer/lib/xoauth2");
const db = require("../models");
const { Op, where } = require('sequelize');

const Booking = db.booking
const detailSlot = db.detailSlot


//new booking after jpt select TimeSlot
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
// module.exports.newBooking = async (req, res) => {
//     const { ID_Booking, Old_Timeslot, New_Timeslot } = req.body
//     let flag = 0
//     let No_Booking = null
//     try {

//         const updateNewDetailSlot = await detailSlot.increment({
//             Booking_Qty: 1
//         }, {
//             where: {
//                 id: New_Timeslot
//             }
//         })

//         res.status(200).send("Booking Successfully created!")
//     } catch (error) {
//         res.status(500).send({ message: error.message })
//     }
// }