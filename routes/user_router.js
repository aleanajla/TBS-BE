    const router = require("express").Router();

const {signUp, login, sendResetToken, userVerifyResetPassword, userSetNewPassword, verifyToken} = require('../controllers/authController')
const {authentication} = require("../middleware/authJWT")

router.post('/users/register', signUp)
router.post('/users/login', login)
router.post('/auth/user/forgot-password', sendResetToken)
// router.get('/auth/user/verify-resetpassword/:token', userVerifyResetPassword)
router.patch("/auth/user/change-password", userSetNewPassword)
router.get("/auth/user", authentication, verifyToken)

module.exports = router
