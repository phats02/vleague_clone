const e = require('express')
const homeM = require('../models/home.m')
var jwt = require('jsonwebtoken');
var opts = require("../config/opts")
exports.landingPage = (req, res, next) => {
    try {
        
        res.render('home/landingPage', {
            title: 'Home',
            account: (jwt.decode(req.cookies.jwt)) ? jwt.decode(req.cookies.jwt).user:null
        })
    }
    catch (err) {
        next(err)
    }
}
exports.login = (req, res, next) => {
    if (req.method == 'GET') {
        try {
            if (req.isAuthenticated()){
                return res.redirect('/admin')
            }
            res.render('login', {
                title: "Login",
                account: (jwt.decode(req.cookies.jwt)) ? jwt.decode(req.cookies.jwt).user:null
            })
        }
        catch (err) {
            next(err)
        }
    }
    else if (req.method == 'POST') {
        try {
            if (homeM.checkSignIn(req.body.user, req.body.password)) {
                let payload = { user: req.body.user }
                const token = jwt.sign(payload, opts.secretOrKey)
                const oneHour = 60 * 60 * 60;
                res.cookie('jwt', token, { maxAge: oneHour, httpOnly: true, });
                return res.redirect('/admin')
            }
            else {
                res.render('login', {
                    title: "Login",
                    account: (jwt.decode(req.cookies.jwt)) ? jwt.decode(req.cookies.jwt).user:null
                })
            }
        }
        catch (err) {
            next(err)
        }
    }
}
exports.registration = async (req, res, next) => {
    try {
        const rule = await homeM.getRule()
        const loaicauthu = await homeM.getLoaiCauThu()
        rule['LoaiCauThu'] = loaicauthu
        //  res.json(rule);
        res.render("regis", {
            Luat: rule,
            account: (jwt.decode(req.cookies.jwt)) ? jwt.decode(req.cookies.jwt).user:null
        })
    }
    catch (err) {
        next(err)
    }
}
exports.logout=(req,res,next)=>{
    res.cookie('jwt','',{ maxAge:1, httpOnly: true, })
    res.redirect('/')
}