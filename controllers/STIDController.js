const db = require("../models");
const { Op, literal, Sequelize } = require('sequelize');

const Truck = db.masterTruck
const Driver = db.masterDriver
const STID = db.masterSTID


module.exports.viewTruck = async (req,res) => {
    const ID_Customer = req.params.id
    try{
        const dataTruck = await Truck.findAll({
            where: {
                ID_Customer: ID_Customer
            }
        });

        res.status(200).send(dataTruck)
    }
    catch(error){
        res.status(500).send({message : error.message})
    }
}

module.exports.viewDriver = async (req,res) => {
    const ID_Customer = req.params.id
    try{
        const dataDriver = await Driver.findAll({
            where: {
                ID_Customer: ID_Customer
            }
        });

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
    const {stid, ID_Customer} = req.query;
    try{
        const search = await STID.findAll({
            where: {
                STID_Number: db.sequelize.where(db.sequelize.fn('lower', db.sequelize.col("STID_Number")), {
                    [Op.like] : `%${stid}%`
                })
            },
            include: [
                {
                    model: Driver,
                    where: {
                        ID_Customer: ID_Customer
                    }
                }
            ]
        })
        console.log(search);
        res.status(200).send(search);
    }
    catch (error){
        console.log(error);
        res.status(500).send({message : error.message})
    }
}

module.exports.searchTruck = async (req, res) => {
    const {truck, ID_Customer} = req.query;
    try{
        const search = await Truck.findAll({
            where: {
                [Op.and]: [
                    {Plat_Number: db.sequelize.where(db.sequelize.fn('lower', db.sequelize.col("Plat_Number")), {
                        [Op.like]: `%${truck}%`
                    })},
                    {ID_Customer: ID_Customer}
                ]
            }
        })
        res.status(200).send(search);
    }
    catch(error){
        res.status(500).send({message : error.message})
    }
}

module.exports.searchDriver = async (req, res) => {
    const {driver, ID_Customer} = req.query;
    try{
        const search = await Driver.findAll({
            where: {
                [Op.and]: [
                    {Driver_Name: db.sequelize.where(db.sequelize.fn('lower', db.sequelize.col("Driver_Name")), {
                        [Op.like]: `%${driver}%`
                    })},
                    {ID_Customer: ID_Customer}
                ]
            }
        })
        res.status(200).send(search);
    }
    catch (error){
        res.status(500).send({message : error.message})
    }
}

module.exports.viewSTID = async (req,res) => {
    const ID_Customer = req.params.id
    try{
        const result = await STID.findAll({
            attributes: ['STID_Number'],
            include: [
                {
                    model: Driver,
                    attributes: ['Driver_Name'],
                    where: {
                        ID_Customer: ID_Customer
                    }
                },
                {
                    model: Truck,
                    attributes: ['Plat_Number', 'Size'],
                    where: {
                        ID_Customer: ID_Customer
                    }
                }
            ]
        })
        res.status(200).send(result)
    }
    catch(error) {
        res.status(500).send({message : error.message})
    }
}

module.exports.editSTID = async (req,res) => {
    const {driver, truck, id} = req.body
    try{
        const update = await STID.update({
            Driver_ID: driver,
            Truck_ID: truck
        }, {
            where: {
                id: id
            }
        })
        res.status(200).send(update)
    }
    catch(error) {
        res.status(500).send({message : error.message})
    }
}

module.exports.deleteSTID = async (req,res) => {
    // tinggal nambahin id customernya
    const {id} = req.body
    try{
        const remove = await STID.destroy({
            where : {
                id: id
            }
        })
        console.log(remove);
        res.status(200).send("Successfully Deleted")
    }
    catch(error){
        res.status(500).send({message : error.message})
    }
}


