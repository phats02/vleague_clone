const express=require('express')
const exphbs=require('express-handlebars')
const routersHome=require("./routers/home.r")
const jwt=require('jsonwebtoken')

const app=express()
const port=3000

app.engine('hbs',exphbs.engine({
    extname:'hbs',
    defaultLayout:'container.hbs',
    layoutsDir:'views/_layouts',
    partialsDir:'views/_partials',
}));
app.set('view engine','hbs')
app.use(express.static(__dirname+'/public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

require('./config/passport.js')(app)

app.use('/',routersHome)
app.use((req,res,next)=>{
    res.render('404',{
        title:'404',
        account: (jwt.decode(req.cookies.jwt)) ? jwt.decode(req.cookies.jwt).user:null
    })
})
app.use((err,req,res,next)=>{
    console.log(err)
    res.render('404',{
        title:'404',
        account: (jwt.decode(req.cookies.jwt)) ? jwt.decode(req.cookies.jwt).user:null
    })
})

app.listen(port,()=>console.log(`Running app in port ${port}`))
