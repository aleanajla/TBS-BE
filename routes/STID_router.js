const router = require("express").Router();

const {addSTID, viewDriver, viewTruck, searchSTID, searchDriver, searchTruck} = require('../controllers/STIDController')

router.post('/users/add/stid', addSTID)
router.get('/users/drivers', viewDriver)
router.get('/users/trucks', viewTruck)
router.get('/users/search/stid/:stid', searchSTID)
router.get('/users/search/driver/:driver', searchDriver)
router.get('/users/search/truck/:truck', searchTruck)

module.exports = router
