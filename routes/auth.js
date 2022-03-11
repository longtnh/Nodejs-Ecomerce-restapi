const router = require("express").Router()
const authController = require("../controller/authController")
const passport = require("passport")
const passportConfig = require("../passport/passport")

//Register
router.post("/register", authController.register)

//Login
router.post("/login", passport.authenticate("local", { session: false }), authController.login)

//Google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'], session: false }))

//Google Callback
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login', session: false }), authController.googleLogin)

module.exports = router