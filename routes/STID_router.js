const router = require("express").Router();

const {addSTID, viewDriver, viewTruck, searchSTID, searchDriver, searchTruck, deleteSTID, viewSTID, editSTID} = require('../controllers/STIDController')

router.post('/users/add/stid', addSTID)
router.get('/users/drivers/:id', viewDriver)
router.get('/users/trucks/:id', viewTruck)
router.get('/users/search/stid', searchSTID)
router.get('/users/search/driver', searchDriver)
router.get('/users/search/truck', searchTruck)
router.post('/users/delete/stid', deleteSTID)
router.get('/users/view/stid/:id', viewSTID)
router.post('/users/update/stid', editSTID)

module.exports = router
