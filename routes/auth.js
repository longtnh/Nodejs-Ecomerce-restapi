const router = require("express").Router()
const authController = require("../controller/authController")
const passport = require("passport")
const passportConfig = require("../passport/passport")

//Register
router.post("/register", authController.register)

//Login
router.post("/login", passport.authenticate("local", { session: false }), authController.login)

module.exports = router