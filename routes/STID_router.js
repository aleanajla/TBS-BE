const router = require("express").Router();

const {addSTID, viewDriver, viewTruck, searchSTID} = require('../controllers/STIDController')

router.post('/users/add/stid', addSTID)
router.get('/users/drivers', viewDriver)
router.get('/users/trucks', viewTruck)
router.get('/users/search/stid/:stid', searchSTID)

module.exports = router
