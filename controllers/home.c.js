const e = require('express')
const homeM = require('../models/home.m')
var jwt = require('jsonwebtoken');
var opts = require("../config/opts")
var path = require('path')

exports.landingPage = (req, res, next) => {
    try {

        res.render('home/landingPage', {
            title: 'Home',
            account: (jwt.decode(req.cookies.jwt)) ? jwt.decode(req.cookies.jwt).user : null
        })
    }
    catch (err) {
        next(err)
    }
}
exports.login = (req, res, next) => {
    if (req.method == 'GET') {
        try {
            if (req.isAuthenticated()) {
                return res.redirect('/admin')
            }
            res.render('login', {
                title: "Login",
                account: (jwt.decode(req.cookies.jwt)) ? jwt.decode(req.cookies.jwt).user : null
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
                    account: (jwt.decode(req.cookies.jwt)) ? jwt.decode(req.cookies.jwt).user : null
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
        if (req.method == 'GET') {
            const rule = await homeM.getRule()
            const loaicauthu = await homeM.getLoaiCauThu()
            rule['LoaiCauThu'] = loaicauthu
            // console.log(req.query)
            //  res.json(rule);
            res.render("regis", {
                title: "Registration",
                Luat: rule,
                account: (jwt.decode(req.cookies.jwt)) ? jwt.decode(req.cookies.jwt).user : null,
                success:req.query.success
            })
        }
        else if (req.method == 'POST') {
            const body = req.body
            
            const addSan = await homeM.addSan({ "TenSan": body["TeamField"] })
            const addDoi = await homeM.addDoi({ "TenDoi": body["TeamName"], "MaSan": addSan["MaSan"], "SoCauThu": body["PlayerNum"] })
            homeM.writeFile(`./public/Logo/${addDoi.MaDoi}`+path.extname(req.file.originalname), req.file.buffer)
            for (var i = 1; i <= body["PlayerNum"]; i++) {
                const addCauThu = await homeM.addCauThu({ "TenCauThu":body[`PlayerName${i}`],"NgaySinh":body[`PlayerBD${i}`],"MaLoaiCauThu":body['PlayerPos'][i-1],"MaDoi":addDoi.MaDoi,"NhapTich":(body[`isFor${i}`]!=null)})
            }
            return res.redirect('/registration?success=1')
        }
    }
    catch (err) {
        next(err)
    }
}
exports.logout = (req, res, next) => {
    res.cookie('jwt', '', { maxAge: 1, httpOnly: true, })
    res.redirect('/')
}