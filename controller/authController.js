const User = require("../models/User")
const Cart = require("../models/Cart")
const CryptoJS = require("crypto-js")
const jwt = require("jsonwebtoken")
const mail = require("../middleware/sendEmail")

const register = async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString()
  })

  try {
    const savedUser = await newUser.save()

    //Send Email verification
    const token_mail_verification = jwt.sign({
      id: newUser._id,
      isAdmin: newUser.isAdmin
    }, process.env.TOKEN_MAIL)

    const url = "localhost:5000/api/auth/verify?token=" + token_mail_verification

    mail.sendEmail(newUser.email, 'Account Verification', '<p>Click the link below to verify your account!</p><br>' + url)

    //create cart for this User when new User is created
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
    if(!user.isVerified) {
      res.status(401).send({msg:'Your Email has not been verified. Please click on resend'})
    }
    else {
      const accessToken = jwt.sign({
        id: user._id,
        isAdmin: user.isAdmin
      }, process.env.JWT_SECRET_KEY)
  
      const { password, ...others } = user._doc;  
      res.status(200).json({...others, accessToken});
    }
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

const verify = async (req, res) => {
  try {
    token = req.query.token
    if(!token) {
      res.status(500).send("Wrong token!")
    }
    const decode = jwt.verify(token, process.env.TOKEN_MAIL)
    const user = await User.findByIdAndUpdate(decode.id, { isVerified: true })

    res.status(200).send({msg:'Your Email has been verified!'})
  }
  catch(err) {
    res.status(500).json(err)
  }
}

module.exports = {register, login, googleLogin, verify}