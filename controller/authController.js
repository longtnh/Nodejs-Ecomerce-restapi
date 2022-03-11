const User = require("../models/User")
const Cart = require("../models/Cart")
const CryptoJS = require("crypto-js")
const jwt = require("jsonwebtoken")

const register = async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString()
  })

  try {
    const savedUser = await newUser.save()

    //create new cart
    const newCart = new Cart({
      userId : newUser._id,
      products: []
    })
    await newCart.save()

    res.status(201).json(savedUser)
  }
  catch(err) {
    res.status(500).json(err)
  }
}

const login = async (req, res) => {
  try {
    const user = req.user
    const accessToken = jwt.sign({
      id: user._id,
      isAdmin: user.isAdmin
    }, process.env.JWT_SECRET_KEY)

    const { password, ...others } = user._doc;  
    res.status(200).json({...others, accessToken});
  }
  catch(err) {
    res.status(500).json(err)
  }
}

const googleLogin = async (req, res) => {
  try {
    const user = req.user
    const accessToken = jwt.sign({
      id: user._id,
      isAdmin: user.isAdmin
    }, process.env.JWT_SECRET_KEY)
    const message = "Login with Google Successfully!"

    res.status(200).json({ message, ...user._doc, accessToken })
  }
  catch(err) {
    res.status(500).json(err)
  }
}

module.exports = {register, login, googleLogin}