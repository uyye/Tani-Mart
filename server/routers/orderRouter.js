const express = require("express")
const OrderController = require("../controllers/orderController")
const authentication = require("../middlewares/authentication")
const adminAuthorization = require("../middlewares/adminAuthorization")
const router = express.Router()

//statistic
router.get("/statistic", authentication, OrderController.orderStatistic)
router.get("/topOrder", authentication, OrderController.topOrder)

//admin
router.get("/admin/daily", OrderController.dailyOrder)
router.get("/admin/topOrder", OrderController.allTopOrder)
router.get("/admin", OrderController.getOrderAdmin)


//order
router.post("/", authentication, OrderController.orderProduct)
// router.post("/payment", authentication, OrderController.payment)
router.get("/", authentication, OrderController.getOrder)

//seller
router.get("/seller",  authentication, adminAuthorization, OrderController.getOrderSeller)
// router.get("/admin",  authentication, adminAuthorization, OrderController.getOrderAdmin)
router.get("/seller/:id", authentication, OrderController.getOrderDetailSeller)
router.get("/:id", authentication, OrderController.getOrderDetail)




module.exports = router