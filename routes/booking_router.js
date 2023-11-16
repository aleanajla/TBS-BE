const router = require("express").Router();
const {viewRequest} = require('../controllers/bookingController')

router.get('/users/view/request', viewRequest)

module.exports = router
