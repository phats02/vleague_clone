const app = require('express')
const router = app.Router()
const multer = require('multer')
var upload = multer({ storage: multer.memoryStorage({}) })
const adminC = require("../controllers/admin.c")


router.get('/',adminC.menu)
router.get('/matchResult',adminC.redirectMatchResult)
router.get('/matchResult/:id(\\d+)',adminC.mathResult)
router.post('/matchResult/:id(\\d+)',adminC.mathResult)
module.exports = router
