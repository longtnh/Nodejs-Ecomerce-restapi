const { checkAdmin } = require("../middleware/verifyToken")
const userController = require("../controller/userController")
const passport = require("passport")
const passportConfig = require("../passport/passport")

const router = require("express").Router()

//update (User)
router.put("/", passport.authenticate("jwt", { session: false }), userController.update)

//get detail (User)
router.get("/detail/", passport.authenticate("jwt", { session: false }), userController.getDetail)

//get all user (Admin)
router.get("/", passport.authenticate("jwt", { session: false }), checkAdmin, userController.getAll)

//delete (Admin)
router.delete("/:id", passport.authenticate("jwt", { session: false }), checkAdmin, userController.remove)

module.exports = router