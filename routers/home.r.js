const app = require('express')
const router = app.Router()
const homeC = require("../controllers/home.c")
const multer = require('multer')
var upload = multer({ storage: multer.memoryStorage({}) })
var passport = require('passport');

router.get('/',homeC.landingPage)
router.get('/registration',homeC.registration)
router.post('/registration', upload.single('logo'),homeC.registration)
router.use('/information',require("./information.r"))
router.get('/login',homeC.login)
router.get('/logout',homeC.logout)
router.post('/login',homeC.login)
router.use('/admin',passport.authenticate('jwt', {
    failureRedirect: '/login'
}),require('./admin.r'))

<<<<<<< HEAD
<<<<<<< HEAD

router.get('/test',homeC.insertdata);

=======
>>>>>>> d535d886a7dced5e41a97b3b0f03d32fd90c7b59
=======
>>>>>>> f925fd28779402875a8e984f62159ee7a7de5092
module.exports = router
