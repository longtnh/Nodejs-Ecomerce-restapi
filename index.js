const express = require("express")
const app = express()
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const userRoute = require("./routes/user")
const authRouter = require("./routes/auth")
const productRouter = require("./routes/product")
const cartRouter = require("./routes/cart")
const orderRouter = require("./routes/order")

dotenv.config();

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connect successfully!"))
  .catch((err) => {
    console.log(err)
  })

app.use(express.json())

app.use('/image', express.static('./assets/image'))

app.use("/api/auth", authRouter)
app.use("/api/user", userRoute)
app.use("/api/product", productRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)

app.listen(process.env.PORT || 5000, () => {
  console.log("NodeJs server is running!")
})