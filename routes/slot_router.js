const router = require("express").Router();
const { addSlot } = require("../controllers/slotController")

router.post('/users/add/slot', addSlot);

module.exports = router