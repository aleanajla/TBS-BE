const router = require("express").Router();
const { addSlot, editSlot, deleteSlot, viewSlot, updateBookingQty, addTimeSlot, addDetailSlot } = require("../controllers/slotController")

router.post('/users/add/slot', addSlot);
router.post('/users/add/detailSlot', addDetailSlot);
router.post('/users/update/slot', editSlot);
router.post('/users/delete/slot/:id', deleteSlot);
router.get('/users/slot/:date', viewSlot);

module.exports = router