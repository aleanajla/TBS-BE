const router = require("express").Router();
const { addSlot, editSlot, deleteSlot, viewSlot } = require("../controllers/slotController")

router.post('/users/add/slot', addSlot);
router.post('/users/update/slot', editSlot);
router.post('/users/delete/slot/:id', deleteSlot);
router.get('/users/slot/:id', viewSlot);

module.exports = router