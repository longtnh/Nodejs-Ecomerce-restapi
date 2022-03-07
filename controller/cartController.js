const Cart = require("../models/Cart")

const getCart = async (req, res) => {
  try {
    const userCart = await Cart.findOne({userId: req.user.id}).populate('products.productId')
    res.status(200).json(userCart)
  }
  catch(err) {
    res.status(500).json(err)
  }
}

const addToCart = async (req, res) => {
  const productIdAdd = req.params.productId
  try {
    const userCart = await Cart.findOne({userId: req.user.id})

    const productInCart = userCart.products.find( ({ productId }) => productId === productIdAdd )
    if(productInCart === undefined) {
      userCart.products.push({
        productId: productIdAdd,
        quantity: 1
      })
    }
    else {
      productInCart.quantity += 1
    }
    // console.log(userCart)
    const newCart = await Cart.findOneAndUpdate({userId: req.user.id}, {
      $set: userCart
    },
    {new: true})

    res.status(200).json(newCart)
  }
  catch(err) {
    res.status(500).json(err)
  }
}

const increment = async (req, res) => {
  const productIdAdd = req.params.productId
  try {
    const userCart = await Cart.findOne({userId: req.user.id})

    const productInCart = userCart.products.find( ({ productId }) => productId === productIdAdd )
    if(productInCart !== undefined) productInCart.quantity += 1

    const newCart = await Cart.findOneAndUpdate({userId: req.user.id}, {
      $set: userCart
    },
    {new: true})

    res.status(200).json(newCart)
  }
  catch(err) {
    res.status(500).json(err)
  }
}

const decrement = async (req, res) => {
  const productIdAdd = req.params.productId
  try {
    const userCart = await Cart.findOne({userId: req.user.id})

    const productInCart = userCart.products.find( ({ productId }) => productId === productIdAdd )
    if(productInCart !== undefined) productInCart.quantity -= 1

    const newCart = await Cart.findOneAndUpdate({userId: req.user.id}, {
      $set: userCart
    },
    {new: true})

    res.status(200).json(newCart)
  }
  catch(err) {
    res.status(500).json(err)
  }
}

module.exports = {getCart, addToCart, increment, decrement}