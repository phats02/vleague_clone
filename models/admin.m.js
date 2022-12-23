const db = require('./db.js')

module.exports = {
    getMatchUnfinished: async () => {
        let match = await db.query(`select DISTINCT "td"."MaTranDau" as "MaTran" ,"d1"."MaDoi" as "MaDoi1","d1"."TenDoi" as "TenDoi1","td"."MaDoi2" as "MaDoi2", "d2"."TenDoi" as "TenDoi2","SAN"."TenSan","td"."NgayGio"
        from "TRANDAU" as "td","DOI" as "d1", "DOI" as "d2","SAN"
        where "td"."SoBanThangDoi1" is null and "td"."SoBanThangDoi2" is null and "d1"."MaDoi"="td"."MaDoi1" and "d2"."MaDoi"="td"."MaDoi2" and "SAN"."MaSan"="td"."MaSan" and "d1"."MaDoi" != "d2"."MaDoi"
        order by "td"."NgayGio" `)
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
        if (!match) return null
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
    updateMatch: async (data, id) => {
        const rs = await db.query(`update "TRANDAU" set "SoBanThangDoi1"=${data["score-team-1"]}, "SoBanThangDoi2"=${data["score-team-2"]} where "MaTranDau"=${id} RETURNING "MaTranDau"`)
        console.log(data)
        if (data["player-team-1"]) {
            console.log(typeof data["player-team-1"])
            for (var i = 0; i < data["player-team-1"].length; i++) {
                console.log(1,data["player-team-1"][i])
                var entity = { "MaTranDau": id, "MaCauThu": data["player-team-1"][i], "ThoiDiem": data["time-team-1"][i], "MaLoaiBanThang": data["loaiban-team-1"][i] }
                await db.insert("GHIBAN", entity)
            }
        }
        if (data["player-team-2"]) {

            for (var i = 0; i < data["player-team-2"].length; i++) {
            console.log(2,data["player-team-1"][i])

                var entity = { "MaTranDau": id, "MaCauThu": data["player-team-2"][i], "ThoiDiem": data["time-team-2"][i], "MaLoaiBanThang": data["loaiban-team-2"][i] }
                await db.insert("GHIBAN", entity)
            }
        }
    },
    getLoaiBanThang: async () => {
        const rs = await db.getAll("LOAIBANTHANG")
        return rs
    },
    getAllThamSo: async () => {
        const rs = await db.getOne("THAMSO", "MaThamSo", 1)
        return rs
    },
    updateThamSo: async (data) => {
        const rs = await db.query(`Update "THAMSO" set "TuoiToiThieu"=${data["TuoiToiThieu"]},"TuoiToiDa"=${data["TuoiToiDa"]},"SoCauthutoiThieu"=${data["SoCauthutoiThieu"]}, "SoCauThuNuocNgoaiToiDa"=${data["SoCauThuNuocNgoaiToiDa"]},"SoCauThuToiDa"=${data["SoCauThuToiDa"]},"TDGhiBanToithieu"=${data["TDGhiBanToithieu"]},"TDGhiBanToiDa"=${data["TDGhiBanToiDa"]},"DiemBanThang"=${data["DiemBanThang"]},"DiemBanHoa"=${data["DiemBanHoa"]},"DiemBanThua"=${data["DiemBanThua"]} where "MaThamSo"=1`)
        return rs
    },
    getAllLoaiBanThang: async () => {
        return await db.getAll("LOAIBANTHANG")
    },
    addLoaiBanThang: async(name)=>{
        var loai=await db.getOne("LOAIBANTHANG","TenLoaiBanThang",name)
        if (loai != null) return -1
        else {
            const entity={"TenLoaiBanThang":name}
            try{
                await db.insert("LOAIBANTHANG",entity)
                return 1
            }
            catch(err){
                console.log(err)
                return -1
            }
        }
    },
    deleteLoaiBanThang: async (id)=>{
        try{
            await db.delete("LOAIBANTHANG","MaLoaiBanThang",id)
            return 1
        }
        catch(err){
            return -1
        }
    },
    addMatch:async(data)=>{
        const rs=await db.insert("TRANDAU",data)
        return rs
    },
    deleteMatch: async(id)=>{
        try{
            await db.delete("TRANDAU","MaTranDau",id)
            return 1
        }
        catch(err){
            return -1
        }
    },
    getRanking: async()=>{
        let rs= await db.query(`Select "RANKING".*, "d"."TenDoi" as "TenDoi"  from "RANKING", "DOI" as "d" where "RANKING"."MaDoi"="d"."MaDoi" order by "RANKING"."Rank"`)
        return rs
    },
    getOtherUnfinishedMatch: async(idMatch) =>{
        let rs= await db.query(`select "otherMatch".*,"team1"."TenDoi" as "TenDoi1","team2"."TenDoi" as "TenDoi2" 
        from "TRANDAU" as "currMatch","TRANDAU" as "otherMatch", "DOI" as "team1", "DOI" as "team2" 
        where "currMatch"."MaTranDau"='${idMatch}' and "otherMatch"."MaTranDau"!="currMatch"."MaTranDau" and "otherMatch"."MaDoi1"="team1"."MaDoi" and "otherMatch"."MaDoi2"="team2"."MaDoi" and "otherMatch"."SoBanThangDoi1" is null and "otherMatch"."SoBanThangDoi2" is null 
        order by extract(day from "currMatch"."NgayGio" - "otherMatch"."NgayGio") limit 3`)
        return rs
    }
}