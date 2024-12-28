const express = require("express")
const router = express.Router()

const userRouter = require("./userRouter")
const productRouter = require("./productRouter")
const orderRouter = require("./orderRouter")
const cartRouter = require("./cartRouter")
const webhookRouter = require("./webhookRouter")
const paymentRouter = require("./paymentRouter")
const favoriteRouter = require("./favoriteRouter")

router.use("/users", userRouter)
router.use("/products", productRouter)
router.use("/orders", orderRouter)
router.use("/carts", cartRouter)
router.use("/webhooks", webhookRouter)
router.use("/payments", paymentRouter)
router.use("/favorites", favoriteRouter)

module.exports = router