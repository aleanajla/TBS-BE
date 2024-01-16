const db = require("../models");
const { Op, literal, Sequelize, where } = require("sequelize");
const slot = require("../models/slot");

const Slot = db.slot;
const detailSlot = db.detailSlot;
const booking = db.booking;

module.exports.addSlot = async (req, res) => {
  let { ID_Terminal, startDate, endDate, from, to, capacity } = req.body;
  startDate = new Date(startDate);
  endDate = new Date(endDate);

  try {
    const totalDays = Math.floor(
      (endDate - startDate) / (1000 * 60 * 60 * 24) + 1
    );
    console.log(totalDays, "Total Days");
    const slotList = [...new Array(totalDays).keys()]
      .map((value) => ({
        ID_Terminal,
        Date: new Date(startDate).setDate(startDate.getDate() + value + 1),
      }))
      .map((slot) => ({
        ...slot,
        Date: new Date(slot.Date).toISOString().split("T")[0],
      }));
    console.log(slotList, "Slot List");

    // Check if slots already exist in the database
    const existingSlots = await Slot.findAll({
      where: {
        ID_Terminal,
        Date: slotList.map((slot) => slot.Date),
      },
    });

    if (existingSlots) {
      console.log(existingSlots, "Existing Slots");
    }

    const listCreateSlot = [];

    slotList.forEach((slot) => {
      let matchDate = existingSlots.find((i) => slot.Date === i.Date);
      if (!matchDate) {
        listCreateSlot.push(slot);
      }
    });

    console.log(listCreateSlot, "List Create Slot");

    const createSlot = await Slot.bulkCreate(listCreateSlot);
    console.log(createSlot, "Create Slot");

    const detailTimeSlot = [];

    if (existingSlots) {
      const existingDetailSlot = await detailSlot.findAll({
        where: {
          ID_Slot: existingSlots.map((slot) => slot.id),
        },
      });
      if (existingDetailSlot) {
        existingSlots.flatMap((value) => {
          const dataValue = {
            ID_Slot: value.id,
            Start: from,
            End: to,
            Qty: capacity,
            Booking_Qty: 0,
          };

          const DataDetailSlot = existingDetailSlot.find((slots) => {
            const [startHour, startMinutes] = slots.Start.split(":");
            const [endHour, endMinutes] = slots.End.split(":");
            if (value.id === slots.ID_Slot) {
              return (
                `${startHour}:${startMinutes}` == from &&
                `${endHour}:${endMinutes}` == to
              );
            } else {
              return null;
            }
          });
          console.log(DataDetailSlot, "Data Detail Slot");
          if (!DataDetailSlot) {
            detailTimeSlot.push(dataValue);
          }
        });
      }
    }

    console.log(detailTimeSlot, "Detail Time Slot");

    const detailTimeSlot2 = createSlot.flatMap((value) => ({
      ID_Slot: value.id,
      Start: from,
      End: to,
      Qty: capacity,
      Booking_Qty: 0,
    }));
    console.log(detailTimeSlot2, "Detail Time Slot 2");

    const mergedData = [...detailTimeSlot, ...detailTimeSlot2];
    console.log(mergedData, "Merge Data");
    const createDetailSlot = await detailSlot.bulkCreate(mergedData);
    console.log(createDetailSlot, mergedData);

    res.status(200).send("Success");
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};

module.exports.checkTimeSlot = async (req, res) => {
  let { ID_Terminal, startDate, endDate, from, to, capacity } = req.body;

  startDate = new Date(startDate);
  endDate = new Date(endDate);
  let err;
  try {
    const totalDays = Math.floor(
      (endDate - startDate) / (1000 * 60 * 60 * 24) + 1
    );
    const slotList = [...new Array(totalDays).keys()]
      .map((value) => ({
        ID_Terminal,
        Date: new Date(startDate).setDate(startDate.getDate() + value + 1),
      }))
      .map((slot) => ({
        ...slot,
        Date: new Date(slot.Date).toISOString().split("T")[0],
      }));
    console.log(slotList, "Slot List");

    // Check if slots already exist in the database
    const existingSlots = await Slot.findAll({
      where: {
        ID_Terminal,
        Date: slotList.map((slot) => slot.Date),
      },
    });

    if (existingSlots) {
      console.log(existingSlots, "Existing Slots");
      const existingDetailSlot = await detailSlot.findAll({
        where: {
          ID_Slot: existingSlots.map((slot) => slot.id),
        },
      });

      console.log(existingDetailSlot, "Existinf Detail Slot");
      if (existingDetailSlot) {
        existingSlots.flatMap((value) => {
          const DataDetailSlot = existingDetailSlot.find((slots) => {
            const [startHour, startMinutes] = slots.Start.split(":");
            console.log(`${startHour}:${startMinutes}`, "Start");
            const [endHour, endMinutes] = slots.End.split(":");
            console.log(`${endHour}:${endMinutes}`, "End");
            if (value.id === slots.ID_Slot) {
              console.log(
                from >= `${startHour}:${startMinutes}` &&
                  to <= `${endHour}:${endMinutes}`
              );
              if (
                from >= `${startHour}:${startMinutes}` &&
                to <= `${endHour}:${endMinutes}`
              ) {
                err = "data range not valid";
              }
            }
          });
        });
      }
    }
    if (err) {
      res.status(400).send({ Message: "Data Range Is Not Valid!" });
    } else {
      res.status(200).send("valid");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports.editSlot = async (req, res) => {
  console.log(req.body);
  const { Qty, id } = req.body;
  try {
    const update = await detailSlot.update(
      {
        Qty,
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

    res.status(200).json("Successfully Updated!");
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
          attributes: ["id", "Start", "End", "Qty", "Booking_Qty"],
        },
      ],
      order: [[{ model: detailSlot }, "Start", "ASC"]],
    });

    res.status(200).send(response);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
