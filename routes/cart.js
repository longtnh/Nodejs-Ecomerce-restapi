const { verifyToken, verifyTokenAdmin } = require("./verifyToken")
const cartController = require("../controller/cartController")

const router = require("express").Router()

router.get("/", verifyToken, cartController.getCart)

router.patch("/addToCart/:productId", verifyToken, cartController.addToCart)

router.patch("/increment/:productId", verifyToken, cartController.increment)

router.patch("/decrement/:productId", verifyToken, cartController.decrement)

module.exports = router