const mongoose = require("mongoose")

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        productId: {
          type: String,
          ref: "Product"
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    amount: { type: Number, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true},
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
)

module.exports = mongoose.model("Order", OrderSchema)