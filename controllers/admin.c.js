const e = require('express')
const adminM = require('../models/admin.m')
const url_helper = require('../helper/url_helper')
// const { updateThamSo, getMatchUnfinished } = require('../models/admin.m')
const db = require('../models/db')
const jwt = require('jsonwebtoken')

exports.menu = (req, res, next) => {
    try {
        res.render('admin/menu', {
            title: "Admin Menu",
            currentURL: url_helper.formatURL(req.originalUrl),
            account: (jwt.decode(req.cookies.jwt)) ? jwt.decode(req.cookies.jwt).user:null
        })
    }
    catch (err) {
        next(err)
    }
}
exports.mathResult = async (req, res, next) => {
    var idMatch = req.params.id
    if (req.method == 'GET') {
        var page = req.query.page
        const matches = await adminM.getMatchbyID(idMatch)
        const LoaiBanThang = await adminM.getLoaiBanThang()
        const THAMSO = await adminM.getAllThamSo()
        const otherUnfinishedMatch=await adminM.getOtherUnfinishedMatch(idMatch)
        res.render("admin/matchResult", {
            ThamSo:THAMSO,
            matches: matches,
            title: "Change Match Result",
            currentURL: url_helper.formatURL(req.originalUrl),
            LoaiBanThang: LoaiBanThang,
            OtherMatches:otherUnfinishedMatch,
            account: (jwt.decode(req.cookies.jwt)) ? jwt.decode(req.cookies.jwt).user:null,
            success:req.query.success

        })
    }
    else if (req.method == 'POST') {
        try {
            if (req.body['player-team-1'] && typeof req.body['player-team-1'] == 'string') req.body['player-team-1'] = new Array(req.body['player-team-1'])
            if (req.body['player-team-2'] && typeof req.body['player-team-2'] == 'string') req.body['player-team-2'] = new Array(req.body['player-team-2'])
            if (req.body['time-team-1'] && typeof req.body['time-team-1'] == 'string') req.body['time-team-1'] = new Array(req.body['time-team-1'])
            if (req.body['time-team-2'] && typeof req.body['time-team-2'] == 'string') req.body['time-team-2'] = new Array(req.body['time-team-2'])
            if (req.body['loaiban-team-1'] && typeof req.body['loaiban-team-1'] == 'string') req.body['loaiban-team-1'] = new Array(req.body['loaiban-team-1'])
            if (req.body['loaiban-team-2'] && typeof req.body['loaiban-team-2'] == 'string') req.body['loaiban-team-2'] = new Array(req.body['loaiban-team-2'])
            const rs = await adminM.updateMatch(req.body, idMatch)
            res.redirect('/admin/mathResult')
        }
        catch (err) {
            next(err)
        }
    }

}
exports.redirectMatchResult = async (req, res, next) => {
    try {
        const matches = await adminM.getMatchUnfinished()
        res.redirect(`/admin/matchResult/${matches[0].MaTran}`)
        // res.json(await adminM.getallMatch())
        
    }
    catch (err) {
        next(err)
    }

}
exports.changeRule = async (req, res, next) => {
    try {
        if (req.method == 'GET') {
            const THAMSO = await adminM.getAllThamSo()
            const LOAIBANTHANG = await adminM.getAllLoaiBanThang()
            res.render('admin/changeRule', {
                title: "Change Rule",
                THAMSO: THAMSO,
                LOAIBANTHANG: LOAIBANTHANG,
                currentURl: url_helper.formatURL(req.originalUrl),
                account: (jwt.decode(req.cookies.jwt)) ? jwt.decode(req.cookies.jwt).user:null,
                success:req.query.success
            })
        }
        else if (req.method == 'POST') {
            await adminM.updateThamSo(req.body)
            res.redirect('/admin/changeRule?success=1')
        }
    }
    catch (err) {
        next(err)
    }
}
exports.addLoaiBanThang = async (req, res, next) => {
    try {
        const status = await adminM.addLoaiBanThang(req.query.name)
        res.json(status)
    }
    catch (err) {
        next(err)
    }
}
exports.deleteLoaiBanThang = async (req, res, next) => {
    try {
        const status = await adminM.deleteLoaiBanThang(req.params.id)
        res.json(status)
    }
    catch (err) {
        next(err)
    }
}
exports.schedule = async (req, res, next) => {
    try {
        const TRANDAU = await adminM.getMatchUnfinished()
        // console.log(TRANDAU)
        //res.json(TRANDAU)
        res.render('admin/schedule', {
            title: 'Schedule',
            TRANDAU: TRANDAU,
            account: (jwt.decode(req.cookies.jwt)) ? jwt.decode(req.cookies.jwt).user:null
        })
    }
    catch (err) {
        next(err)
    }
}
exports.addMatch = async (req, res, next) => {
    try {
        if (req.method == 'GET') {
            const san = await db.getAll("SAN")
            const doi = await db.getAll("DOI")
            res.render('admin/addMatch', {
                title:'Add match',
                SAN: san,
                DOI: doi,
                currentURL: url_helper.formatURL(req.originalUrl),
                account: (jwt.decode(req.cookies.jwt)) ? jwt.decode(req.cookies.jwt).user:null,
                success:req.query.success

            })
        }
        else {
            try {
                await adminM.addMatch(req.body)
                res.redirect('/admin/addMatch?success=1')
            }
            catch (err) {
                next(err)
            }
        }
    }
    catch (err) {
        next(err)
    }
}
exports.deleteMatch = async (req, res, next) => {
    try {
        const status = await adminM.deleteMatch(req.query.id)
        res.json(status)
    }
    catch (err) {
        next(err)
    }
}

exports.Ranking = async (req,res,next) =>{
    try {
        const rank= await adminM.getRanking();
        res.render("admin/ranking",{
            title: "Ranking",
            rank:rank,
            currentURl: url_helper.formatURL(req.originalUrl),
            account: (jwt.decode(req.cookies.jwt)) ? jwt.decode(req.cookies.jwt).user:null
        })
    } catch (error) {
        next(error)
    }
}