const db = require("../models");
const { Op, literal, Sequelize, where } = require("sequelize");
const slot = require("../models/slot");

const Slot = db.slot;
const detailSlot = db.detailSlot;
const booking = db.booking;

module.exports.addSlot = async (req, res) => {
  let { ID_Terminal, startDate, endDate, from, to, capacity} = req.body
  startDate = new Date(startDate)
  endDate = new Date(endDate)
  console.log(startDate, endDate);
  // console.log(ID_Terminal, date, Start, End, Qty);

  try {
    const totalDays = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24) + 1);
    const slotList = [...new Array(totalDays).keys()].map((value) => ({ ID_Terminal, Date: new Date(startDate).setDate(startDate.getDate() + value) }))

    const createSlot = await Slot.bulkCreate(slotList);

    // console.log(createSlot.map((value) => value.id));
    // console.log(detailTimeSlot)

    const detailTimeSlot = createSlot.flatMap((value) => ({
      ID_Slot: value.id,
      Start: from,
      End: to,
      Qty: capacity
    }))
    console.log(detailTimeSlot)
    const createDetailSlot = await detailSlot.bulkCreate(detailTimeSlot);

    res.status(200).send({ createSlot, createDetailSlot });
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: error.message });
  }
};

module.exports.addDetailSlot = async (req, res) => {
  let { ID_Slot, Start, End, Qty } = req.body

  // console.log(ID_Terminal, date, Start, End, Qty);
  try {
    
    const createDetailSlot = await detailSlot.create({
      ID_Slot,
      Start,
      End,
      Qty
    });

    res.status(200).send({ createDetailSlot });
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: error.message });
  }
};

module.exports.editSlot = async (req, res) => {
  console.log(req.body);
  const { Start, End, Qty, id } = req.body;
  try {
    const update = await detailSlot.update(
      {
        Start,
        End,
        Qty,
        updatedAt: new Date(),
      },
      {
        where: {
          id,
        },
      }
    );

    const updatedData = await detailSlot.findOne({
      where: {
        id,
      },
    });

    res.status(200).json(updatedData);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports.deleteSlot = async (req, res) => {
  const id = req.params.id;
  try {
    const removeSlot = await detailSlot.destroy({
      where: {
        id,
      },
    });
    console.log(removeSlot);
    res.status(200).send("Successfully Deleted");
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports.viewSlot = async (req, res) => {
  const date = req.params.date;
  const inputDate = new Date(date);

  const year = inputDate.getFullYear();
  const month = (inputDate.getMonth() + 1).toString().padStart(2, "0"); // Month is 0-indexed
  const day = inputDate.getDate().toString().padStart(2, "0");

  const formattedDateString = `${year}-${month}-${day}`;

  try {
    const response = await Slot.findAll({
      attributes: [],
      where: {
        Date: formattedDateString,
      },
      include: [
        {
          model: detailSlot,
          attributes: ["id","Start", "End", "Qty", "Booking_Qty"],
        },
      ],
    });

    res.status(200).send(response);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// module.exports.addTimeSlot = async (req, res) => {
//   const id = req.params.id;
//   try {
//     const updateBookingQty = await detailSlot.increment(
//       {
//         Booking_Qty: 1,
//       },
//       {
//         where: {
//           id,
//         },
//       }
//     );

//     const updatedData = await detailSlot.findOne({
//       where: {
//         id,
//       },
//     });

//     res.status(200).send(updatedData);
//   } catch (error) {
//     res.status(500).send({ message: error.message });
//   }
// };

// module.exports.editTimeSlot = async (req, res) => {
//   const prevId = req.params.id;
//   const updatedId = req.params.id;

//   try {
//     const updatePrevBookingQty = await detailSlot.decrement(
//       {
//         Booking_Qty: 1,
//       },
//       {
//         where: {
//           id: prevId,
//         },
//       }
//     );

//     const updateBookingQty = await detailSlot.increment(
//       {
//         Booking_Qty: 1,
//       },
//       {
//         where: {
//           id: updatedId,
//         },
//       }
//     );

//     res.status(200).send("edit success!");
//   } catch (error) {
//     res.status(500).send({ message: error.message });
//   }
// };
