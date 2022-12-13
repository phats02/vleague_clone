const e = require('express')
const informationM = require('../models/information.m')
const url_helper=require('../helper/url_helper')
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
    
}