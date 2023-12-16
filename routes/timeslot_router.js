const { newBooking } = require("../controllers/timeslotController");

const router = require("express").Router();

router.post('/users/create/booking', newBooking)


module.exports = router