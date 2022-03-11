const passport = require("passport")
const JwtStrategy = require("passport-jwt").Strategy
const LocalStrategy = require("passport-local").Strategy
const GoogleStrategy = require("passport-google-oauth20").Strategy
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
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  try {
    const user = await User.findOne({ email })

    if(!user) return done(null, false)
  
    const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY).toString(CryptoJS.enc.Utf8)
    if(hashedPassword != password) return done(null, false)

    done(null, user)
  }
  catch(err) {
    done(error, false)
  }
}))

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const ExistUser = await User.findOne({ 
      authGoogleId: profile.id, 
      authType: "google" 
    })
    if(ExistUser) return done(null, ExistUser)

    const newUser = new User({
      username: profile.displayName,
      email: profile.emails[0].value,
      authGoogleId: profile.id,
      authType: "google"
    })

    await newUser.save()

    done(null, newUser)
  }
  catch(err) {
    done(error, false)
  }

}
))