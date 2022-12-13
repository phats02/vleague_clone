const app = require('express')
const router = app.Router()
const informationC=require('../controllers/information.c')

router.get('/',informationC.menuPage)
router.get('/rule',informationC.rulePage)
module.exports = router
