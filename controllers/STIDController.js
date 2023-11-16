const db = require("../models");
const { Op, literal, Sequelize } = require('sequelize');

const Truck = db.masterTruck
const Driver = db.masterDriver
const STID = db.masterSTID


module.exports.viewTruck = async (req,res) => {
    try{
        const dataTruck = await Truck.findAll();

        res.status(200).send(dataTruck)
    }
    catch(error){
        res.status(500).send({message : error.message})
    }
}

module.exports.viewDriver = async (req,res) => {
    try{
        const dataDriver = await Driver.findAll();

        res.status(200).send(dataDriver)
    }
    catch(error) {
        res.status(500).send({message : error.message})
    }
}

module.exports.addSTID = async(req,res) => {
    const {Driver_ID, Truck_ID} = req.body
    let flag = 0
    let STIDNumber = null;
    
    try{
        // generate STID_Number
        do{
            const randomNumbers = Math.floor(100000 + Math.random() * 900000);
            STIDNumber = `C${randomNumbers}`;
        
            const searchSTID = await STID.findOne({
                where: {
                    STID_Number: STIDNumber
                }
            })

            if(!searchSTID){
                flag = 1;
                break;
            }
        }while(flag == 1);

        console.log(STIDNumber);

        const createSTID = await STID.create({
            STID_Number: STIDNumber,
            Driver_ID: Driver_ID,
            Truck_ID: Truck_ID
        })

        res.status(200).send(createSTID)
    }
    catch(error){
        res.status(500).send({message : error.message})
    }
}

module.exports.searchSTID = async (req, res) => {
    const stid = req.params.stid;
    try{
        const search = await STID.findAll({
            where: {
                STID_Number: {
                    [Op.substring]: [`${stid}`],
                }
            }
        })
        res.status(200).send(search);
    }
    catch{
        res.status(500).send({message : error.message})
    }
}

module.exports.searchTruck = async (req, res) => {
    const truck = req.params.truck;
    try{
        const search = await Truck.findAll({
            where: {
                Plat_Number: db.sequelize.where(db.sequelize.fn('lower', db.sequelize.col("Plat_Number")), {
                    [Op.like]: `%${truck}%`
                })
            }
        })
        res.status(200).send(search);
    }
    catch(error){
        res.status(500).send({message : error.message})
    }
}

module.exports.searchDriver = async (req, res) => {
    const driver = req.params.driver;
    try{
        const search = await Driver.findAll({
            where: {
                Driver_Name: db.sequelize.where(db.sequelize.fn('lower', db.sequelize.col("Driver_Name")), {
                    [Op.like]: `%${driver}%`
                })
            }
        })
        res.status(200).send(search);
    }
    catch (error){
        res.status(500).send({message : error.message})
    }
}

// module.exports.addDriver = async(req,res) => {
//     const {Driver_Name, Driver_ID, Phone_Number, SIM_Number} = req.body;
//     try{
//         // bikin function untuk generate uid untuk driver ID
        

//         const createDriver = await Driver.create({
//             Driver_Name: Driver_Name,
//             Driver_ID: Driver_ID, //mesti generate uid 
//             Phone_Number: Phone_Number,
//             SIM_Number: SIM_Number
//         })

//         res.status(200).send(addDriver)
//     }
//     catch(error) {
//         res.status(500).send({message : error.message})
//     }
// }


