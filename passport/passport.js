const passport = require("passport")
const JwtStrategy = require("passport-jwt").Strategy
const LocalStrategy = require("passport-local").Strategy
const { ExtractJwt } = require("passport-jwt")
const CryptoJS = require("crypto-js")
const dotenv = require("dotenv").config()
const User = require("../models/User")

passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken("Authorization"),
  secretOrKey: process.env.JWT_SECRET_KEY
}, (payload, done) => {
  try {
    done(null, payload)
  }
  catch(err) {
    done(error, false)
  }
}))

passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password'
}, async (username, password, done) => {
  try {
    const user = await User.findOne({ username })

    if(!user) return done(null, false)
  
    const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY).toString(CryptoJS.enc.Utf8)
    if(hashedPassword != password) return done(null, false)

    done(null, user)
  }
  catch(err) {

  }
}))