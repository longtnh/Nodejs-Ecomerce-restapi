const nodemailer = require("nodemailer")
const dotenv = require("dotenv").config()

const sendEmail = (to, subject, body) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.ADMIN_EMAIL,
      pass: process.env.ADMIN_PASSWORD
    }
  })

  //send email
  transporter.sendMail({
    from: process.env.ADMIN_EMAIL, 
    to: to, 
    subject: subject, 
    html: body
  })
}

module.exports = { sendEmail }