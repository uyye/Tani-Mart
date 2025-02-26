const express = require("express")
const PaymentController = require("../controllers/paymentController")
const authentication = require("../middlewares/authentication")
const router = express.Router()

router.post("/", authentication, PaymentController.payment)
router.post("/webhooks", authentication, PaymentController.midtransWebHook)

//statistic
router.get("/daily/sales", authentication, PaymentController.dailyStatistic)
router.get("/weekly/sales", authentication, PaymentController.weeklyStatistic)
router.get("/monthly/sales", authentication, PaymentController.montlyStatistic)
router.get("/daily/buyer", authentication, PaymentController.buyerStatistic)

//admin
router.get("/admin/daily/withdraw", PaymentController.dailyWithdraw)
router.get("/admin/daily/commission", PaymentController.adminCommission)
router.get("/admin/chart", PaymentController.adminChart)

module.exports = router