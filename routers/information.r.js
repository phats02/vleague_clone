const app = require('express')
const router = app.Router()
const informationC=require('../controllers/information.c')

router.get('/',informationC.menuPage)
router.get('/rule',informationC.rulePage)
router.get('/resultLeague',informationC.resultMatch)
router.get('/team',informationC.allTeamPage)
router.get('/team/:id(\\d+)',informationC.getPlayer)
router.get('/ranking',informationC.ranking)
module.exports = router
