const express = require("express")
const OrderController = require("../controllers/orderController")
const authentication = require("../middlewares/authentication")
const router = express.Router()

router.post("/", authentication, OrderController.orderProduct)
router.post("/payment", authentication, OrderController.payment)
router.get("/:id", authentication, OrderController.getOrder)


module.exports = router