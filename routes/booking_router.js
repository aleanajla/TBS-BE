const router = require("express").Router();
const {viewRequest, searchBooking, searchRequest, filterVessel, filterPort, filterTerminal, filterService, viewContainer, viewTruckingCompany} = require('../controllers/bookingController')

router.get('/users/view/request', viewRequest)
router.post('/users/search/request', searchRequest)
router.get('/users/search/vessel', filterVessel)
router.get('/users/search/port', filterPort)
router.get('/users/search/terminal', filterTerminal)
router.get('/users/search/service', filterService)
router.get('/users/view/containers', viewContainer)
router.get('/users/view/trucking', viewTruckingCompany)


module.exports = router
