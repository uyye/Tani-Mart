require("dotenv").config()
require("./helpers/cronJob")
const express = require("express")
const app = express()
const router = require("./routers")
const errorHandler = require("./middlewares/errorHandler")
const cors = require("cors")

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())
app.use(router)
app.use(errorHandler)

module.exports = app