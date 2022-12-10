const app = require('express')
const router = app.Router()
const homeC = require("../controllers/home.c")
const multer = require('multer')
var upload = multer({ storage: multer.memoryStorage({}) })

module.exports = router
