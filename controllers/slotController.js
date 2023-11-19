const db = require("../models");
const { Op, literal, Sequelize, where } = require('sequelize');

const Slot = db.slot
const detailSlot = db.detailSlot
const user = db.user

module.exports.addSlot = async (req, res) => {
    const { ID_Terminal, date, Start, End, Qty } = req.body
    console.log(ID_Terminal, date, Start, End, Qty);
    try {
        const createSlot = await Slot.create({
            ID_Terminal: ID_Terminal,
            Date: date,
            createdAt: new Date(),
            updatedAt: new Date()
        })

        console.log(createSlot.id);


        const createDetailSlot = await detailSlot.create({
            ID_Slot: createSlot.id,
            Start: Start,
            End: End,
            Qty: Qty,
            Booking_Qty: null,
            createdAt: new Date(),
            updatedAt: new Date()
        }, { field: ['Start', 'End', 'Qty'] })

        res.status(200).send({ createSlot, createDetailSlot })
    }
    catch (error) {
        res.status(500).send({ message: error.message })
    }
}

module.exports.editSlot = async (req, res) => {
    console.log(req.body);
    const { Start, End, Qty, id } = req.body
    try {
        const update = await detailSlot.update({
            Start,
            End,
            Qty,
            updatedAt: new Date()
        }, {
            where: {
                id
            }
        })

        const updatedData = await detailSlot.findOne({
            where: {
                id
            }
        })

        res.status(200).json(updatedData)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}


module.exports.deleteSlot = async (req, res) => {
    const id = req.params.id
    try {
        const removeSlot = await detailSlot.destroy({
            where: {
                id
            }
        })
        console.log(removeSlot)
        res.status(200).send("Successfully Deleted")
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

module.exports.viewSlot = async (req, res) => {
    // console.log=(req.params.id)
    const ID_Slot = req.params.id
    try {
        const viewSlot = await detailSlot.findAll({
            where: {
                ID_Slot
            }
        });

        res.status(200).send(viewSlot)

    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}