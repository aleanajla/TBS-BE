const { newBooking, countingTimeslot } = require("../controllers/timeslotController");

const router = require("express").Router();

router.post('/users/create/booking', newBooking)
router.get('/users/counting/timeslot/:id', countingTimeslot)


module.exports = router