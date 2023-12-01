const router = require("express").Router();
const { viewRequest, viewCancelledTP, viewRequestTP } = require("../controllers/transportOrderController");

router.get('/users/view/requestTP/:id', viewRequestTP)
router.get('/users/view/cancelTP/:id', viewCancelledTP)

module.exports = router