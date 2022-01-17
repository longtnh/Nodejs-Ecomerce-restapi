const router = require("express").Router()
const authController = require("../controller/authController")

//Register
router.post("/register", authController.register)

//Login
router.post("/login", authController.login)

module.exports = router