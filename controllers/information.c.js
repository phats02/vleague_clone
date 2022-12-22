const e = require('express')
const informationM = require('../models/information.m')
const url_helper = require('../helper/url_helper')
const db = require('../models/db')
const jwt=require('jsonwebtoken')
exports.menuPage = (req, res, next) => {
    try {
        res.render('information/menu', {
            title: 'Thông tin giải đấu',
            currentURL: url_helper.formatURL(req.originalUrl),
            account: (jwt.decode(req.cookies.jwt)) ? jwt.decode(req.cookies.jwt).user:null
        })
    }
    catch (err) {
        next(err)
    }
}
exports.rulePage = (req, res, next) => {
    res.render('information/rule', {
        title: 'Luật',
        account: (jwt.decode(req.cookies.jwt)) ? jwt.decode(req.cookies.jwt).user:null
    })
}
exports.resultMatch = async (req, res, next) => {
    try {
        const match = await informationM.getResultMath(req.query.page || 0, 1)
         //res.json(match)
        res.render('information/result', {
            Tran: match,
            account: (jwt.decode(req.cookies.jwt)) ? jwt.decode(req.cookies.jwt).user:null,
            title:'Match Result'
        })
    }
    catch (err) {
        next(err)
    }
}
exports.allTeamPage = async (req, res, next) => {
    try {
        const allTeam = await informationM.getAllTeam()
        //res.json(allTeam)
        res.render('information/allteam', {
            Doi: allTeam,
            account: (jwt.decode(req.cookies.jwt)) ? jwt.decode(req.cookies.jwt).user:null,
            title:"Teams"
        })
    }
    catch (err) {
        next(err)
    }
}
exports.getPlayer = async (req, res, next) => {
    try {
        const idDoi = req.params.id
        const players = await informationM.getPlayerOfTeam(idDoi)
        //res.json(players)
        res.render('information/playersOfTeam', {
            CauThu: players,
            account: (jwt.decode(req.cookies.jwt)) ? jwt.decode(req.cookies.jwt).user:null,
            title:"Players"
        })
    } catch (err) {
        next(err)
    }
}

exports.ranking = async (req, res, next) => {
    try {
        res.render('information/ranking',{
            account: (jwt.decode(req.cookies.jwt)) ? jwt.decode(req.cookies.jwt).user:null,
            title:'Ranking'
        })
    }
    catch (err) {
        next(err)
    }
}