const db=require('./db.js')

module.exports={
    getResultMath:async(page,perPage) =>{
        let match=await db.query(`select "td"."MaTranDau" as "MaTran" ,"d1"."MaDoi" as "MaDoi1","d1"."TenDoi" as "TenDoi1","d2"."MaDoi" as "MaDoi2", "d2"."TenDoi" as "Doi2","td"."SoBanThangDoi1" as "SoBanThangDoi1", "td"."SoBanThangDoi2" as "SoBanThangDoi2","SAN"."TenSan","td"."NgayGio"
        from "TRANDAU" as "td","DOI" as "d1", "DOI" as "d2","SAN"
        where "td"."SoBanThangDoi1" is not null and "td"."SoBanThangDoi2" is not null and "d1"."MaDoi"="td"."MaDoi1" and "d2"."MaDoi"="td"."MaDoi2" and "SAN"."MaSan"="td"."MaSan" and "d1"."MaDoi" != "d2"."MaDoi"
        order by "td"."NgayGio" desc offset ${page*perPage} limit ${perPage}`)
        for (var i=0;i<match.length;i++){
            let ghibanDoi1=await db.query(`select "GHIBAN"."ThoiDiem" as "ThoiDiem", "CAUTHU"."TenCauThu" as "TenCauThu" 
            from "GHIBAN", "CAUTHU"
            where "GHIBAN"."MaTranDau"=${match[i].MaTran} and "GHIBAN"."MaCauThu"="CAUTHU"."MaCauThu" and "CAUTHU"."MaDoi"=${match[i].MaDoi1} order by "GHIBAN"."ThoiDiem" desc`)
            match[i].banThangDoi1=ghibanDoi1
            let ghibanDoi2=await db.query(`select "GHIBAN"."ThoiDiem" as "ThoiDiem", "CAUTHU"."TenCauThu" as "TenCauThu" 
            from "GHIBAN", "CAUTHU"
            where "GHIBAN"."MaTranDau"=${match[i].MaTran} and "GHIBAN"."MaCauThu"="CAUTHU"."MaCauThu" and "CAUTHU"."MaDoi"=${match[i].MaDoi2} order by "GHIBAN"."ThoiDiem" desc`)
            match[i].banThangDoi2=ghibanDoi2
        }
        return match
    },
    getAllTeam:async () =>{
        let rs=await db.getAll("DOI")
        return rs
    },
    getPlayerOfTeam: async(maDoi)=>{
        let rs=await db.query(`Select "CAUTHU"."MaCauThu" as "MaCauThu","CAUTHU"."TenCauThu" as "TenCauThu", "LOAICAUTHU"."TenLoaiCauThu" as "LoaiCauThu",
        (Select count(*) from "GHIBAN" where "GHIBAN"."MaCauThu"= "CAUTHU"."MaCauThu") as "SoBanThang"
        from "CAUTHU","LOAICAUTHU"
        where "CAUTHU"."MaDoi"=${maDoi} and "LOAICAUTHU"."MaLoaiCauThu"="CAUTHU"."MaLoaiCauThu"
        order by "LOAICAUTHU"."MaLoaiCauThu" `)
        return rs
    },

}