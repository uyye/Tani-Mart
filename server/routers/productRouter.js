const express = require("express")
const ProductController = require("../controllers/productController")
const authentication = require("../middlewares/authentication")
const adminAuthorization = require("../middlewares/adminAuthorization")
const router = express.Router()
const multer = require("multer")
const storage = multer.memoryStorage()
const upload = multer({storage})

//admin
router.get("/presales", authentication, ProductController.getPresaleProduct)
router.get("/request/admin", authentication, ProductController.adminRequestProduct)
router.post("/approve", ProductController.productApprove)

router.get("/", ProductController.getProduct)
router.get("/admin", authentication, ProductController.getSellerProduct)
router.post("/", upload.single("file"), authentication, ProductController.addProduct)
router.get("/request/seller", authentication, ProductController.sellerRequestProduct)
router.get("/:id", ProductController.productById)
router.put("/:id", upload.single("file"), authentication,  adminAuthorization, ProductController.updateProduct)
router.delete("/:id",authentication, adminAuthorization, ProductController.deleteProduct)


module.exports = router