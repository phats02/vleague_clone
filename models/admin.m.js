const { mathResult } = require('../controllers/admin.c.js')
const { all } = require('../routers/admin.r.js')
const db = require('./db.js')

module.exports = {
    getMatchUnfinished: async (page, perPage) => {
        let match = await db.query(`select DISTINCT "td"."MaTranDau" as "MaTran" ,"d1"."MaDoi" as "MaDoi1","d1"."TenDoi" as "TenDoi1","td"."MaDoi2" as "MaDoi2", "d2"."TenDoi" as "TenDoi2","SAN"."TenSan","td"."NgayGio"
        from "TRANDAU" as "td","DOI" as "d1", "DOI" as "d2","SAN"
        where "td"."SoBanThangDoi1" is null or "td"."SoBanThangDoi2" is null and "d1"."MaDoi"="td"."MaDoi1" and "d1"."MaDoi"="td"."MaDoi2" and "SAN"."MaSan"="td"."MaSan" and "d1"."MaDoi" != "d2"."MaDoi"
        order by "td"."NgayGio" offset ${page * perPage} limit ${perPage}`)
        for (var i = 0; i < match.length; i++) {
            let playerOfTeam1 = await db.query(`Select "CAUTHU"."TenCauThu" as "TenCauThu", "LOAICAUTHU"."TenLoaiCauThu" as "LoaiCauThu","CAUTHU"."MaCauThu" as "MaCauThu"
            from "CAUTHU","LOAICAUTHU"
            where "CAUTHU"."MaDoi"=${match[i].MaDoi1} and "LOAICAUTHU"."MaLoaiCauThu"="CAUTHU"."MaLoaiCauThu"
            order by "LOAICAUTHU"."MaLoaiCauThu"`)
            match[i].CauThuDoi1 = playerOfTeam1
            let playerOfTeam2 = await db.query(`Select "CAUTHU"."TenCauThu" as "TenCauThu", "LOAICAUTHU"."TenLoaiCauThu" as "LoaiCauThu","CAUTHU"."MaCauThu" as "MaCauThu"
            from "CAUTHU","LOAICAUTHU"
            where "CAUTHU"."MaDoi"=${match[i].MaDoi2} and "LOAICAUTHU"."MaLoaiCauThu"="CAUTHU"."MaLoaiCauThu"
            order by "LOAICAUTHU"."MaLoaiCauThu"`)
            match[i].CauThuDoi2 = playerOfTeam2
        }
        return match
    },
    getallMatch: async () => {
        const a = await db.getAll("TRANDAU")
        return a
    },
    getMatchbyID: async (id) => {
        const match = await db.getOne("TRANDAU", "MaTranDau", id)
        const playerOfTeam1 = await db.query(`Select * from "DOI" as "d","CAUTHU" as "ct" where "d"."MaDoi"=${match.MaDoi1} and "ct"."MaDoi"="d"."MaDoi"`)
        const playerOfTeam2 = await db.query(`Select * from "DOI" as "d","CAUTHU" as "ct" where "d"."MaDoi"=${match.MaDoi2} and "ct"."MaDoi"="d"."MaDoi"`)

        match.CauThuDoi1 = playerOfTeam1
        match.CauThuDoi2 = playerOfTeam2
        let ghibanDoi1 = await db.query(`select * 
            from "GHIBAN", "CAUTHU"
            where "GHIBAN"."MaTranDau"=${id} and "GHIBAN"."MaCauThu"="CAUTHU"."MaCauThu" and "CAUTHU"."MaDoi"=${match.MaDoi1} order by "GHIBAN"."ThoiDiem" desc`)
        match.banThangDoi1 = ghibanDoi1
        let ghibanDoi2 = await db.query(`select * 
            from "GHIBAN", "CAUTHU"
            where "GHIBAN"."MaTranDau"=${id} and "GHIBAN"."MaCauThu"="CAUTHU"."MaCauThu" and "CAUTHU"."MaDoi"=${match.MaDoi2} order by "GHIBAN"."ThoiDiem" desc`)
        match.banThangDoi2 = ghibanDoi2
        return match
    },
    updateMatch: async(data,id)=>{
            const rs=await db.query(`update "TRANDAU" set "SoBanThangDoi1"=${data["score-team-1"]}, "SoBanThangDoi2"=${data["score-team-2"]} where "MaTranDau"=${id} RETURNING "MaTranDau"`)
            console.log(data)
            for (var i=0;i<data["player-team-1"].length;i++){
                var entity={"MaTranDau":id,"MaCauThu":data["player-team-1"][i],"ThoiDiem":data["time-team-1"][i],"MaLoaiBanThang":data["loaiban-team-1"][i]}
                await db.insert("GHIBAN",entity)
            }
            for (var i=0;i<data["player-team-2"].length;i++){
                var entity={"MaTranDau":id,"MaCauThu":data["player-team-2"][i],"ThoiDiem":data["time-team-2"][i],"MaLoaiBanThang":data["loaiban-team-2"][i]}
                await db.insert("GHIBAN",entity)
            }
    },
    getLoaiBanThang: async()=>{
        const rs=await db.getAll("LOAIBANTHANG")
        return rs
    }
}