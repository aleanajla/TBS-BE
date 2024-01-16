const router = require("express").Router();
const {viewRequest, searchBooking, searchRequest, filterVessel, filterPort, filterTerminal, filterService, viewContainer, viewTruckingCompany, sortDate, viewPort, viewTerminal, viewVessel, viewService, newBooking, viewRequestTP, viewCancelledTP, viewBooking} = require('../controllers/bookingController')

router.get('/users/view/request/:id', viewRequest)
router.post('/users/search/request', searchRequest)
router.get('/users/view/containers', viewContainer)
router.get('/users/view/bookings', viewBooking)
router.post('/user/create/booking', newBooking)


module.exports = router
