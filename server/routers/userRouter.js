const express = require("express")
const UserController = require("../controllers/userController")
const authentication = require("../middlewares/authentication")
const adminAuthorization = require("../middlewares/adminAuthorization")
const router = express.Router()

router.get("/user", authentication, adminAuthorization, UserController.getUser)
router.post("/register", UserController.register)
router.post("/login", UserController.login)
router.put("/", authentication, UserController.updateUserAddres)

//admin
router.get("/", authentication, adminAuthorization, UserController.getDataUsers)
router.get("/detail/:id", authentication, adminAuthorization, UserController.getDetailUser)
router.delete("/:id", authentication, adminAuthorization, UserController.deleteUser)


module.exports = router