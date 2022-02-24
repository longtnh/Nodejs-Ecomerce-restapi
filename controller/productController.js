const Product = require("../models/Product")

const getAll = async (req, res) => {
  const page = parseInt(req.query.page) || 1
  const pageSize = parseInt(req.query.pageSize) || 5
  try {
    const productList = await Product.find().skip((page - 1) * pageSize).limit(pageSize)
    const countAll = await Product.countDocuments({})
    res.status(200).json({
      total: countAll,
      page: page,
      pageSize: productList.length,
      products: productList
    })
  }
  catch(err) {
    res.status(500).json(err)
  }
}

const getDetail =  async (req, res) => {
  try {
    const productById = await Product.findById(req.params.id)
    res.status(200).json(productById)
  }
  catch(err) {
    res.status(500).json(err)
  }
}

const create = async (req, res) => {
  const newProduct = new Product({
    title: req.body.title,
    desc: req.body.desc,
    img: req.file.filename,
    size: req.body.size,
    color: req.body.color,
    price: req.body.price
  })
  try {
    const savedProduct = await newProduct.save()
    res.status(201).json(savedProduct)
  }
  catch(err) {
    res.status(500).json(err)
  }
}

const update = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      desc: req.body.desc,
      img: req.file.filename,
      size: req.body.size,
      color: req.body.color,
      price: req.body.price
    },
    {new: true})
    res.status(201).json(updatedProduct)
  }
  catch(err) {
    res.status(500).json(err)
  }
}

const remove = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id)
    res.status(201).json("Product has been deleted!")
  }
  catch(err) {
    res.status(500).json(err)
  }
}

module.exports = {getAll, getDetail, create, update, remove}