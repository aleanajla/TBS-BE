const { viewTruckingCompany, searchTruckingCompany, createRequestTC, acceptAssignJob, rejectAssignJob, viewRequestTruckingCompany, tca, viewTicket, editTCA, generateQr } = require("../controllers/assignJobController");

const router = require("express").Router();

router.get('/users/view/trucking', viewTruckingCompany)
router.get('/users/search/assignJob', searchTruckingCompany)
router.get('/users/search/reqTrucking/:id', viewRequestTruckingCompany)
router.post('/users/create/requestTC', createRequestTC)
router.post('/users/update/acceptAssignJob/:id', acceptAssignJob)
router.post('/users/update/rejectAssignJob/:id', rejectAssignJob)
router.post('/users/create/TCA', tca)
router.post('/users/edit/TCA', editTCA)
router.get('/users/view/eticket/:id', viewTicket)
router.get('/users/view/qrcode', generateQr)


module.exports = router