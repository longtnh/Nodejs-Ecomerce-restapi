const { verifyToken, verifyTokenAdmin } = require("./verifyToken")
const userController = require("../controller/userController")

const router = require("express").Router()

//update (User)
router.put("/", verifyToken, userController.update)

//get detail (User)
router.get("/detail/", verifyToken, userController.getDetail)

//get all user (Admin)
router.get("/", verifyTokenAdmin, userController.getAll)

//delete (Admin)
router.delete("/:id", verifyTokenAdmin, userController.remove)

module.exports = router