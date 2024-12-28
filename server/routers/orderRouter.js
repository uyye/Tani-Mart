const express = require("express")
const OrderController = require("../controllers/orderController")
const authentication = require("../middlewares/authentication")
const router = express.Router()

router.post("/", authentication, OrderController.orderProduct)
router.post("/payment", authentication, OrderController.payment)
router.get("/", authentication, OrderController.getOrder)
router.get("/admin", authentication, OrderController.getOrderAdmin)
router.get("/admin/:id", authentication, OrderController.getOrderDetailAdmin)
router.get("/:id", authentication, OrderController.getOrderDetail)


module.exports = router