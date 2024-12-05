const express = require("express")
const CartController = require("../controllers/cartController")
const authentication = require("../middlewares/authentication")
const router = express.Router()

router.get("/", authentication, CartController.getCartByUser)
router.post("/", authentication, CartController.PostCart)
router.delete("/", authentication, CartController.deleteCartItem)

module.exports = router