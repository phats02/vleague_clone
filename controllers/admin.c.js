const e = require('express')
const adminM = require('../models/admin.m')
const url_helper = require('../helper/url_helper')

exports.menu = (req, res, next) => {
    res.render('admin/menu', {
        title: "Admin Menu",
        currentURL: url_helper.formatURL(req.originalUrl)
    })
}
exports.mathResult = async (req, res, next) => {
    var idMatch=req.params.id
    if (req.method == 'GET') {
        var page = req.query.page
        const matches = await adminM.getMatchbyID(idMatch)
        const LoaiBanThang=await adminM.getLoaiBanThang()
        // console.log(matches)
        res.render("admin/matchResult", {
            matches: matches,
            title: "Change Match Result",
            currentURL: url_helper.formatURL(req.originalUrl),
            LoaiBanThang:LoaiBanThang
        })
    }
    else if (req.method == 'POST') {
        try{
            const rs=await adminM.updateMatch(req.body,idMatch)
            res.redirect('/admin')

        }
        catch(err){
            next(err)
        }
    }
}
exports.redirectMatchResult=async(req,res,next)=>{
    const matches = await adminM.getMatchUnfinished(0, 1)
    res.redirect(`/admin/matchResult/${matches[0].MaTran}`)
    // res.json(await adminM.getallMatch())

}