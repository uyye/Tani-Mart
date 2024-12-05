const express = require("express")
const ProductController = require("../controllers/productController")
const authentication = require("../middlewares/authentication")
const adminAuthorization = require("../middlewares/adminAuthorization")
const router = express.Router()

router.get("/", ProductController.getProduct)
router.get("/admin", authentication, ProductController.getAdminProduct)
router.post("/", authentication,  adminAuthorization, ProductController.addProduct)
router.get("/:id", ProductController.productById)
router.put("/:id", authentication,  adminAuthorization, ProductController.updateProduct)
router.delete("/:id",authentication, adminAuthorization, ProductController.deleteProduct)


module.exports = router