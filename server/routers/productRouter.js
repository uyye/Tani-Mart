const express = require("express")
const ProductController = require("../controllers/productController")
const authentication = require("../middlewares/authentication")
const adminAuthorization = require("../middlewares/adminAuthorization")
const router = express.Router()
const multer = require("multer")
const storage = multer.memoryStorage()
const upload = multer({storage})

router.get("/", ProductController.getProduct)
router.get("/admin", authentication, adminAuthorization, ProductController.getSellerProduct)
router.post("/", upload.single("file"), authentication, adminAuthorization, ProductController.addProduct)
router.get("/:id", ProductController.productById)
router.put("/:id", upload.single("file"), authentication,  adminAuthorization, ProductController.updateProduct)
router.delete("/:id",authentication, adminAuthorization, ProductController.deleteProduct)


module.exports = router