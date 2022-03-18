const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    authGoogleId: {
      type: String,
      default: null
    },
    authType: {
      type: String,
      enum: ["local", "google"],
      default: "local"
    },
    isVerified: { type: Boolean, default: false }
  },
  { timestamps: true }
)

module.exports = mongoose.model("User", UserSchema)