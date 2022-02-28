const { verifyToken, verifyTokenAdmin } = require("../middleware/verifyToken")
const orderController = require("../controller/orderController")

const router = require("express").Router()

router.post("/", verifyToken, orderController.createOrder)

router.get("/all", verifyTokenAdmin, orderController.getAllOrder)

router.get("/history", verifyToken, orderController.getHistoryOrderUser)

router.get("/:id", verifyToken, orderController.getDetailOrder)

module.exports = router