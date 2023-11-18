const db = require("../models");

const Slot = db.Slot
const detailSlot = db.detailSlot
const user = db.user

module.exports.addSlot = async (req,res) => {
    const {ID_Terminal, }
    try{
        const createSlot = await Slot.create({
            
        })
    }
    catch (error) {

    }
}

// module.exports.addDetailSlot = async (req, res) => {
//     const {Slot_id, Start, End} = req.body
//     let flag = 0;
//     let slot = null;

//     try {
//         do{
//             const searchSlot = await Slot.findOne({
//                 where:{
//                     id: Slot_id
//                 }
//             })

//             const createDetailSlot = await detailSlot.create({
                
//             })
//         }
//     } catch (error) {
        
//     }
// }

