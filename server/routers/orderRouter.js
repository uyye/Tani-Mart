const express = require("express")
const OrderController = require("../controllers/orderController")
const authentication = require("../middlewares/authentication")
const adminAuthorization = require("../middlewares/adminAuthorization")
const router = express.Router()

router.post("/", authentication, OrderController.orderProduct)
router.post("/payment", authentication, OrderController.payment)
router.get("/", authentication, OrderController.getOrder)
router.get("/seller",  authentication, adminAuthorization, OrderController.getOrderSeller)
router.get("/admin",  authentication, adminAuthorization, OrderController.getOrderAdmin)
router.get("/admin/:id", authentication, OrderController.getOrderDetailAdmin)
router.get("/:id", authentication, OrderController.getOrderDetail)


module.exports = router