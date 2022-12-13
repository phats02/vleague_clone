const e = require('express')
const informationM = require('../models/information.m')
const url_helper=require('../helper/url_helper')
const db = require('../models/db')
exports.menuPage= (req,res,next)=>{
    res.render('information/menu',{
        title:'Thông tin giải đấu',
        currentURL:url_helper.formatURL(req.originalUrl)
    })
}
exports.rulePage=(req,res,next)=>{
    res.render('information/rule',{
        title:'Luật',
    })
}
exports.resultMatch=async(req,res,next)=>{
    const match=await informationM.getResultMath(req.query.page || 0,1)
    res.json(match)
}
exports.allTeamPage=async(req,res,next)=>{
    const allTeam=await informationM.getAllTeam()
    res.json(allTeam)
}
exports.getPlayer=async (req,res,next)=>{
    const idDoi=req.params.id
    const players=await informationM.getPlayerOfTeam(idDoi)
    res.json(players)
}