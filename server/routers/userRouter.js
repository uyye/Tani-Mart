const express = require("express")
const UserController = require("../controllers/userController")
const authentication = require("../middlewares/authentication")
const adminAuthorization = require("../middlewares/adminAuthorization")
const router = express.Router()

router.post("/register", UserController.register)
router.post("/login", UserController.login)
router.put("/", authentication, UserController.updateUserAddres)
router.get("/", authentication, adminAuthorization, UserController.findAllUser)


module.exports = router