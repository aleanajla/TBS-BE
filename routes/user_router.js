const router = require("express").Router();

const {signUp, login} = require('../controllers/authController')

router.post('/users/register', signUp)
router.post('/users/login', login)

module.exports = router
