const { checkAdmin } = require("../middleware/verifyToken")
const orderController = require("../controller/orderController")
const passport = require("passport")
const passportConfig = require("../passport/passport")

const router = require("express").Router()

//create order
router.post("/", passport.authenticate("jwt", { session: false }), orderController.createOrder)

//get all order (admin)
router.get("/all", passport.authenticate("jwt", { session: false }), checkAdmin, orderController.getAllOrder)

//get user history order
router.get("/history", passport.authenticate("jwt", { session: false }), orderController.getHistoryOrderUser)

//get order detail by id
router.get("/:id", passport.authenticate("jwt", { session: false }), orderController.getDetailOrder)

module.exports = router