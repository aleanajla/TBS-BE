const router = require("express").Router();
const {viewRequest, searchBooking, searchRequest, filterVessel, filterPort, filterTerminal, filterService, viewContainer, viewTruckingCompany, sortDate, viewPort, viewTerminal, viewVessel, viewService, newBooking, viewRequestTP, viewCancelledTP, viewBooking, countingContainer} = require('../controllers/bookingController')

router.get('/users/view/request/:id', viewRequest)
router.post('/users/search/request', searchRequest)
router.get('/users/view/containers', viewContainer)
router.get('/users/count/containers/:id', countingContainer)
router.get('/users/view/bookings', viewBooking)
router.post('/user/create/booking', newBooking)
// router.get('/users/search/vessel', filterVessel)
// router.get('/users/search/port', filterPort)
// router.get('/users/search/terminal', filterTerminal)
// router.get('/users/search/service', filterService)
// router.get('/users/sort/date', sortDate)
// router.get('/users/view/port', viewPort)
// router.get('/users/view/terminal', viewTerminal)

// router.get('/users/view/vessel', viewVessel)
// router.get('/users/view/service/:ID_Customer', viewService)


module.exports = router
