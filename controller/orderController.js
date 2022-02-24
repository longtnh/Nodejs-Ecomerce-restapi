const Order = require("../models/Order")
const Cart = require("../models/Cart")

const createOrder = async (req, res) => {
  try {
    const userCart = await Cart.findOne({userId: req.user.id})

    if(userCart.products.length === 0) {
      res.status(500).json("Cart is empty, can't create order")
    }
    else {      
      const newOrder = new Order({
        userId: req.user.id,
        products: userCart.products,
        amount: req.body.amount,
        address: req.body.address,
        phone: req.body.phone
      })

      const savedOrder = await newOrder.save(async (err) => {
        if(err) res.status(500).json("Have some error when order, please try again !")
        //create order success reset cart to empty
        await Cart.findOneAndUpdate({userId: req.user.id}, {
          products: []
        })
      })
      res.status(200).json(savedOrder)
    }

  }
  catch(err) {
    res.status(500).json(err)
  }
}

//admin
const getAllOrder = async (req, res) => {
  const page = parseInt(req.query.page) || 1
  const pageSize = parseInt(req.query.pageSize) || 5
  try {
    const orderList = await Order.find().skip((page - 1) * pageSize).limit(pageSize)
    const countOrder = await Order.countDocuments({})
    res.status(200).json({
      total: countOrder,
      page: page,
      pageSize: orderList.length,
      products: orderList
    })
  }
  catch(err) {
    res.status(500).json(err)
  }
}

const getDetailOrder = async (req, res) => {
  try {
    const orderById = await Order.findById(req.params.id)
    res.status(200).json(orderById)
  }
  catch(err) {
    res.status(500).json(err)
  }
}

const getHistoryOrderUser = async (req, res) => {
  const page = parseInt(req.query.page) || 1
  const pageSize = parseInt(req.query.pageSize) || 5
  try {
    const orderList = await Order.find({userId: req.user.id}).skip((page - 1) * pageSize).limit(pageSize)
    const countOrder = await Order.countDocuments({userId: req.user.id})
    res.status(200).json({
      total: countOrder,
      page: page,
      pageSize: orderList.length,
      products: orderList
    })
  }
  catch(err) {
    res.status(500).json(err)
  }
}

module.exports = {createOrder, getAllOrder, getDetailOrder, getHistoryOrderUser}