const { newBooking, editTimeslot } = require("../controllers/timeslotController");

const router = require("express").Router();

router.post('/users/create/booking', newBooking)
router.post('/users/edit/timeslot', editTimeslot)


module.exports = router