const e = require('express')
const homeM = require('../models/home.m')
var jwt = require('jsonwebtoken');
var opts=require("../config/opts")
exports.landingPage=(req,res,next)=>{
    res.render('home/landingPage',{
        title:'Home'
    })
}
exports.login=(req,res,next)=>{
    if (req.method=='GET'){
        res.render('login',{
            title:"Login"
        })
    }
    else if (req.method=='POST'){
        if (homeM.checkSignIn(req.body.user,req.body.password)){
            let payload={user:req.body.user}
            const token=jwt.sign(payload, opts.secretOrKey)
            const oneHour = 60 * 60*60;
            res.cookie('jwt', token, { maxAge: oneHour, httpOnly: true, });
            return res.redirect('/admin')
        }
        else{
            res.render('login',{
                title:"Login"
            })
        }
    }
}
exports.registration=async (req,res,next)=>{
    const rule=await homeM.getRule()
    const loaicauthu=await homeM.getLoaiCauThu()
    rule['LoaiCauThu']=loaicauthu
    //  res.json(rule);
    res.render("regis",{
        Luat: rule,
    })

}