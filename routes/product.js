const { verifyToken, verifyTokenAdmin } = require("./verifyToken")
const uploadImg = require("../middleware/uploadFile")
const productController = require("../controller/productController")

const router = require("express").Router()

//get all product
router.get("/", productController.getAll)

//get detail product
router.get("/:id", productController.getDetail)

//create product
router.post("/", verifyTokenAdmin, uploadImg.uploadImg, productController.create)

//update product
router.put("/:id", verifyTokenAdmin, uploadImg.uploadImg, productController.update)

//delete product
router.delete("/:id", verifyTokenAdmin, productController.remove)

module.exports = router