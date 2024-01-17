const router = require("express").Router();
const { addSlot, editSlot, viewSlot, checkTimeSlot, getIDTerminal } = require("../controllers/slotController")

router.post('/users/add/slot', addSlot);
router.post('/users/check/slot', checkTimeSlot);
router.post('/users/update/slot', editSlot);
router.get('/users/slot/:date', viewSlot);
router.get('/users/get/data/terminal', getIDTerminal);

module.exports = router