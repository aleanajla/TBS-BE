const { viewRequestTP, viewCancelledTP, viewOnGoingTP, viewCompletedTP, countingRequest, countingCompleted, countingRejected, countingOnGoing } = require("../controllers/transportOrderController");

const router = require("express").Router();

router.get('/users/view/requestTP/:id', viewRequestTP)
router.get('/users/view/cancelTP/:id', viewCancelledTP)
router.get('/users/view/onGoingTP/:id', viewOnGoingTP)
router.get('/users/view/completedTP/:id', viewCompletedTP)
router.get('/users/view/countingRequest/:id', countingRequest)
router.get('/users/view/countingRejected/:id', countingRejected)
router.get('/users/view/countingOnGoing/:id', countingOnGoing)
router.get('/users/view/countingCompleted/:id', countingCompleted)

module.exports = router