const router = require("express").Router();
const {viewRequest, searchBooking, searchRequest} = require('../controllers/bookingController')

router.get('/users/view/request', viewRequest)
router.post('/users/search/request', searchRequest)

module.exports = router
