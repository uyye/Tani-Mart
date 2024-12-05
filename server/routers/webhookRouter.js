const express = require("express")
const handlePaymentNotification = require("../controllers/webhookController")
const router = express.Router()

router.post("/notification", handlePaymentNotification)

module.exports = router