const { viewTruckingCompany, searchTruckingCompany, createRequestTC, acceptAssignJob, rejectAssignJob, viewRequestTruckingCompany } = require("../controllers/assignJobController");

const router = require("express").Router();

router.get('/users/view/trucking', viewTruckingCompany)
router.get('/users/search/assignJob', searchTruckingCompany)
router.get('/users/search/reqTrucking/:id', viewRequestTruckingCompany)
router.post('/users/create/requestTC', createRequestTC)
router.post('/users/update/acceptAssignJob/:id', acceptAssignJob)
router.post('/users/update/rejectAssignJob/:id', rejectAssignJob)

module.exports = router