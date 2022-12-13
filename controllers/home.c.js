const e = require('express')
const homeM = require('../models/home.m')
var jwt = require('jsonwebtoken');

exports.landingPage=(req,res,next)=>{
    res.render('home/landingPage',{
        title:'Home'
    })
}