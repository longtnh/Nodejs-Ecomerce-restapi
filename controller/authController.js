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
    const user = await User.findOne({ username: req.body.username })
    if(!user) res.status(401).json("Wrong username")

    const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY).toString(CryptoJS.enc.Utf8)
    const inputPassword = req.body.password
    if(hashedPassword != inputPassword) res.status(401).json("Wrong Password")

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

module.exports = {register, login}