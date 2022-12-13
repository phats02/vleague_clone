const app = require('express')
const router = app.Router()
const homeC = require("../controllers/home.c")
const multer = require('multer')
var upload = multer({ storage: multer.memoryStorage({}) })


router.get('/',homeC.landingPage)
router.use('/information',require("./information.r"))
module.exports = router
