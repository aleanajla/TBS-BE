const db = require("../models");
const { Op, literal, Sequelize } = require('sequelize');

const Slot = db.slot
const detailSlot = db.detailSlot
const user = db.user

module.exports.addSlot = async (req,res) => {
    const {ID_Terminal, date, Start, End, Qty} = req.body
    console.log(ID_Terminal, date, Start, End, Qty);
    try{
        const createSlot = await Slot.create({
            ID_Terminal : ID_Terminal,
            Date : date,
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
        }, {field: ['Start', 'End', 'Qty']})

        res.status(200).send({createSlot, createDetailSlot})
    }
    catch (error) {
        res.status(500).send({message : error.message})
    }
}

module.exports.editSlot = async (req,res) => {
    
}

