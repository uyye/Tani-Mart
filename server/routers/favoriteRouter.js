const express = require("express")
const authentication = require("../middlewares/authentication")
const FavoriteController = require("../controllers/favoriteController")
const router = express()

router.post("/", authentication, FavoriteController.addFavorite)
router.get("/", authentication, FavoriteController.getFavoriteProduct)
router.delete("/", authentication, FavoriteController.deleteFavorite)
router.get("/:id", authentication, FavoriteController.getFavoriteData)

module.exports = router