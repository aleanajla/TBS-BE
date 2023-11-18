const db = require("../models");

const Slot = db.Slot
const detailSlot = db.detailSlot

module.exports.addSlot = async (req,res) => {
    try{
        const createSlot = await Slot.create({
            
        })
    }
    catch (error) {

    }
}

