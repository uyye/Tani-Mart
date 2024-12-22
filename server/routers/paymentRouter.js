const express = require("express")
const PaymentController = require("../controllers/paymentController")
const authentication = require("../middlewares/authentication")
const router = express.Router()

router.post("/", authentication, PaymentController.payment)
router.post("/webhooks", PaymentController.midtransWebHook)

module.exports = router