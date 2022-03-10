const cartController = require("../controller/cartController")
const passport = require("passport")
const passportConfig = require("../passport/passport")

const router = require("express").Router()

//get cart
router.get("/", passport.authenticate("jwt", { session: false }), cartController.getCart)

//add to cart
router.patch("/addToCart/:productId", passport.authenticate("jwt", { session: false }), cartController.addToCart)

//increment total
router.patch("/increment/:productId", passport.authenticate("jwt", { session: false }), cartController.increment)

//decrement total
router.patch("/decrement/:productId", passport.authenticate("jwt", { session: false }), cartController.decrement)

module.exports = router