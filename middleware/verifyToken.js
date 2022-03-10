const jwt = require("jsonwebtoken")

const checkAdmin = (req, res, next) => {
  if(req.user.isAdmin) {
    next()
  }
  else {
    return res.status(403).json("You are not allowed to do this action")
  }
}

module.exports = { checkAdmin }