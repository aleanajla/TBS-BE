const db = require("../models");
const { Op, literal, Sequelize, QueryTypes } = require("sequelize");
const slot = require("../models/slot");

const Truck = db.masterTruck;
const Driver = db.masterDriver;
const STID = db.masterSTID;
const Booking = db.booking;
const detailSlot = db.detailSlot;
const Slot = db.slot;
const assignJob = db.assignJob;

module.exports.viewTruck = async (req, res) => {
  const ID_Customer = req.params.id;
  const search = req.query.search;
  try {
    const dataTruck = await Truck.findAll({
      where: {
        ID_Customer: ID_Customer,
        Plat_Number: db.sequelize.where(
          db.sequelize.fn("lower", db.sequelize.col("Plat_Number")),
          {
            [Op.like]: `%${search}%`,
          }
        ),
      },
    });

    res.status(200).send(dataTruck);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports.viewDriver = async (req, res) => {
  const ID_Customer = req.params.id;
  const search = req.query.search;
  try {
    const dataDriver = await Driver.findAll({
      where: {
        ID_Customer: ID_Customer,
        Driver_Name: db.sequelize.where(
          db.sequelize.fn("lower", db.sequelize.col("Driver_Name")),
          {
            [Op.like]: `%${search}%`,
          }
        ),
      },
    });

    res.status(200).send(dataDriver);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports.addSTID = async (req, res) => {
  const { Driver_ID, Truck_ID } = req.body;
  let flag = 0;
  let STIDNumber = null;

  try {
    // check driver & truck only can be 1
    const check_driver = await STID.findOne({
      where: {
        Driver_ID: Driver_ID,
      },
    });
    if (check_driver) {
      return res.status(404).send("Driver Already Assign!");
    }
    console.log(check_driver);

    const check_truck = await STID.findOne({
      where: {
        Truck_ID: Truck_ID,
      },
    });
    if (check_truck) {
      return res.status(404).send("Truck Already Assign!");
    }
    console.log(check_truck);

    // generate STID_Number
    do {
      const randomNumbers = Math.floor(100000 + Math.random() * 900000);
      STIDNumber = `C${randomNumbers}`;

      const searchSTID = await STID.findOne({
        where: {
          STID_Number: STIDNumber,
        },
      });

      if (!searchSTID) {
        flag = 1;
        break;
      }
    } while (flag == 1);

    const createSTID = await STID.create({
      STID_Number: STIDNumber,
      Driver_ID: Driver_ID,
      Truck_ID: Truck_ID,
    });

    res.status(200).send(createSTID);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports.searchSTID = async (req, res) => {
  const { stid, ID_Customer } = req.query;
  try {
    const search = await STID.findAll({
      where: {
        STID_Number: db.sequelize.where(
          db.sequelize.fn("lower", db.sequelize.col("STID_Number")),
          {
            [Op.like]: `%${stid}%`,
          }
        ),
      },
      include: [
        {
          model: Driver,
          where: {
            ID_Customer: ID_Customer,
          },
        },
      ],
    });
    console.log(search);
    res.status(200).send(search);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};

module.exports.searchTruck = async (req, res) => {
  const { truck, ID_Customer } = req.query;
  try {
    const search = await Truck.findAll({
      where: {
        [Op.and]: [
          {
            Plat_Number: db.sequelize.where(
              db.sequelize.fn("lower", db.sequelize.col("Plat_Number")),
              {
                [Op.like]: `%${truck}%`,
              }
            ),
          },
          { ID_Customer: ID_Customer },
        ],
      },
    });
    res.status(200).send(search);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports.searchDriver = async (req, res) => {
  const { driver, ID_Customer } = req.query;
  try {
    const search = await Driver.findAll({
      where: {
        [Op.and]: [
          {
            Driver_Name: db.sequelize.where(
              db.sequelize.fn("lower", db.sequelize.col("Driver_Name")),
              {
                [Op.like]: `%${driver}%`,
              }
            ),
          },
          { ID_Customer: ID_Customer },
        ],
      },
    });
    res.status(200).send(search);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports.viewSTID = async (req,res) => {
  const ID_Customer = req.params.id;
  const search = req.query.search;

  try{
    const result = await STID.findAll({
      attributes: ["id", "STID_Number"],
      include: [
        {
          model: Driver,
          attributes: ["Driver_Name"]
        },
        {
          model: Truck,
          attributes: ["Plat_Number", "Size"],
        },
      ],
      where: {
        STID_Number: db.sequelize.where(
          db.sequelize.fn("lower", db.sequelize.col("STID_Number")),
          {
            [Op.like]: `%${search}%`,
          }
        ),
      },
    });
    res.status(200).send(result);
  }catch(error) {
    res.status(500).send({ message: error.message });
  }
}

module.exports.viewSTIDBooking = async (req, res) => {
  const ID_Customer = req.params.id;
  const search = req.query.search;
  const date = req.query.date;

  console.log("Cust ID", ID_Customer, "Search", search, "Date", date);

  try {
    const allSTID = await STID.findAll({
      attributes: ["id", "STID_Number"],
      include: [
        {
          model: Driver,
          attributes: ["Driver_Name"],
          where: {
            ID_Customer: ID_Customer,
            Driver_Name: db.sequelize.where(
              db.sequelize.fn("lower", db.sequelize.col("Driver_Name")),
              {
                [Op.like]: `%${search}%`,
              }
            ),
          },
        },
        {
          model: Truck,
          attributes: ["Plat_Number", "Size"],
          where: {
            ID_Customer: ID_Customer,
          },
        },
      ],
      where: {
        STID_Number: db.sequelize.where(
          db.sequelize.fn("lower", db.sequelize.col("STID_Number")),
          {
            [Op.like]: `%${search}%`,
          }
        ),
      },
    });

    const result = [];

    const query = `SELECT "masterSTIDs"."id" FROM "masterSTIDs" INNER JOIN "assignJobs" ON "assignJobs"."ID_STID" = "masterSTIDs"."id" INNER JOIN bookings ON "bookings"."id" = "assignJobs"."ID_Booking" INNER JOIN "detailSlots" ON "detailSlots"."id" = "bookings"."ID_Detail_Slot"  INNER JOIN "slots" ON "slots"."id" = "detailSlots"."ID_Slot" WHERE "slots"."Date" = :date;`;
  
    const findExisting = await db.sequelize.query(query, {
      type: QueryTypes.SELECT,
      replacements: { date },
    })

    allSTID.map((stid) => {
      let check = findExisting.find((data) => data.id === stid.id);
      if (!check) {
        result.push(stid);
      }
    });

    res.status(200).send(allSTID);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports.editSTID = async (req, res) => {
  console.log(req.body);
  const { Driver_ID, id } = req.body;
  try {
    const checkDriver = await STID.findOne({
      where: {
        Driver_ID,
      },
    });

    if (checkDriver) {
      return res.status(400).send("Driver already assigned!");
    }

    await STID.update(
      {
        Driver_ID,
      },
      {
        where: {
          id,
        },
      }
    );

    const updatedData = await STID.findOne({
      where: {
        id,
      },
    });

    if (!updatedData) {
      return res.status(404).send("Record not found");
    }

    res.status(200).send(updatedData);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};

module.exports.deleteSTID = async (req, res) => {
  const { id } = req.body;
  try {
    const remove = await STID.destroy({
      where: {
        id,
      },
    });
    console.log(remove, "remove");
    res.status(200).send("Successfully Deleted");
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
