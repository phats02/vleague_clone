const { password } = require('../config/pg-config')
const db=require('./db')
module.exports={
    checkSignIn:(username,password)=>{
        return (username=='admin' && password=="admin")
    },
    getRule:async()=>{
        const rs=await db.getOne('THAMSO','MaThamSo',1)
        return rs
    },
    getLoaiCauThu:async()=>{
        const rs=await db.getAll('LOAICAUTHU')
        return rs
    }
}