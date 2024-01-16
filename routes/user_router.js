const router = require("express").Router();

const {signUp, login, sendResetToken, userVerifyResetPassword, userSetNewPassword, verifyToken, viewProfile, changePassword} = require('../controllers/authController')
const {authentication} = require("../middleware/authJWT")

router.post('/users/register', signUp)
router.post('/users/login', login)
router.post('/auth/user/forgot-password', sendResetToken)
router.patch("/auth/user/change-password", userSetNewPassword)
router.get("/auth/user", authentication, verifyToken)
router.get("/view/profile/:id", viewProfile)
router.patch("/users/change-password", changePassword)

module.exports = router
