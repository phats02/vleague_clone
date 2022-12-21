const { password } = require('../config/pg-config')
const db=require('./db')
var fs = require('fs')

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
    },
    addCauThu: async(data)=>{
        const rs=await db.insert("CAUTHU",data)
        return rs
    },
    addDoi: async(data)=>{
        const rs=await db.insert("DOI",data)
        return rs
    }
    ,
    addSan: async(data)=>{
        const rs=await db.insert("SAN",data)
        return rs
    },
    writeFile: async (path,file)=>{
        const pathFolder=path.slice(0,path.lastIndexOf('/'))
        if (!fs.existsSync(pathFolder)){
            fs.mkdirSync(pathFolder, { recursive: true });
        }
        await fs.writeFile(path, file, function (err) {
            if (err) return err
            return 1
          })
    },
}