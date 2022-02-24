const User = require("../models/User")

const update = async (req, res) => {
  if(req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString()
  }

  try { 
    const updatedUser = await User.findByIdAndUpdate(req.user.id, {
      $set: req.body,
    },
    {new: true})

    res.status(200).json(updatedUser)
  }
  catch(err) {
    res.status(500).json(err)
  }
}

const getDetail = async (req, res) => {
  try { 
    const userFind = await User.findById(req.user.id).select('-password')
    res.status(200).json(userFind)
  }
  catch(err) {
    res.status(500).json(err)
  }
}

const getAll = async (req, res) => {
  const page = parseInt(req.query.page) || 1
  const pageSize = parseInt(req.query.pageSize) || 5
  try {
    const users = await User.find({}, {
      password: 0 
    }).skip((page - 1) * pageSize).limit(pageSize)
    const countUsers = await User.countDocuments({})
    res.status(200).json({
      total: countUsers,
      page: page,
      pageSize: users.length,
      users: users
    })
  }
  catch(err) {
    res.status(500).json(err)
  }
}

const remove = async (req, res) => {
  try { 
    const userFind = await User.findByIdAndDelete(req.params.id)
    res.status(200).json("User has been deleted!")
  }
  catch(err) {
    res.status(500).json(err)
  }
}

module.exports = {update, getDetail, getAll, remove}