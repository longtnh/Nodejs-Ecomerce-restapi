const { checkAdmin } = require("../middleware/verifyToken")
const uploadImg = require("../middleware/uploadFile")
const productController = require("../controller/productController")
const passport = require("passport")
const passportConfig = require("../passport/passport")

const router = require("express").Router()

//get all product
router.get("/", productController.getAll)

//get detail product
router.get("/:id", productController.getDetail)

//create product
router.post("/", passport.authenticate("jwt", { session: false }), checkAdmin, uploadImg.uploadImg, productController.create)

//update product
router.put("/:id", passport.authenticate("jwt", { session: false }), checkAdmin, uploadImg.uploadImg, productController.update)

//delete product
router.delete("/:id", passport.authenticate("jwt", { session: false }), checkAdmin, productController.remove)

module.exports = router