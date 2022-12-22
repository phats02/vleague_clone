const pgp = require('pg-promise')();
const cn = require('../config/pg-config')
const db = pgp(cn);

var fs = require('fs')
const pathJSON='./db/db.json';
function readDataFromJson(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(JSON.parse(data));
            }
        })
    })
}

module.exports={
    getAll:async (tableName)=>{
        const table = new pgp.helpers.TableName({ table: tableName });
        const rs=await db.any('select * from $1',table)
        return rs
    },
    insert:async (tableName,entity)=>{ 
        const query=pgp.helpers.insert(entity,null,tableName) +"RETURNING *"
        const rs=await db.one(query)
        return rs
    },
    getOne:async (tableName,columnName,value)=>{
        const table = new pgp.helpers.TableName({table: tableName});
        const column = new pgp.helpers.TableName({table: columnName});
        const rs=await db.oneOrNone('select * from $1 where $1.$2=$3',[table,column,value])
        return rs
    },
    query: async(queryString)=>{
        const rs=await db.any(queryString)
        return rs
    },
    delete:async (tableName,columnName,value)=>{
        const table = new pgp.helpers.TableName({table: tableName});
        const column = new pgp.helpers.TableName({table: columnName});
        const rs=await db.oneOrNone('DELETE FROM $1 WHERE $2=$3 RETURNING $3',[table,column,value])
        return rs
    },

    InsertData: async () => {
        await db.none(`insert into "THAMSO" ("TuoiToiThieu","TuoiToiDa","SoCauthutoiThieu","SoCauThuNuocNgoaiToiDa","SoCauThuToiDa","TDGhiBanToithieu","TDGhiBanToiDa","DiemBanThang","DiemBanHoa","DiemBanThua")
        values (20,40,15,3,22,0,90,3,1,0)`)
        const data=await readDataFromJson(pathJSON);
        dataSan=data.SAN;
        for(var i=0;i<data.SAN.length;i++){
            await db.one('INSERT INTO "SAN"("TenSan") VALUES($1) ON CONFLICT DO NOTHING RETURNING $1', [data.SAN[i].TenSan]);
        }
        dataLoaiBanThang=data.LoaiBanThang;
        for(var i=0;i<dataLoaiBanThang.length;i++){
            await db.one('INSERT INTO "LOAIBANTHANG"("TenLoaiBanThang") VALUES($1) ON CONFLICT DO NOTHING RETURNING $1', [data.LoaiBanThang[i].TenLoaiBanThang]);
        }
        dataDoi=data.DOI;
        for(var i=0;i<data.DOI.length;i++){
            await db.one('INSERT INTO "DOI"("TenDoi","MaSan","SoCauThu") VALUES($1,$2,$3) ON CONFLICT DO NOTHING RETURNING $1', [data.DOI[i].TenDoi,data.DOI[i].MaSan,data.DOI[i].SoCauThu]);
        }
        var LoaiCauThu=data.LoaiCauThu;
        for(var i=0;i<data.LoaiCauThu.length;i++){
            await db.one('INSERT INTO "LOAICAUTHU" ("TenLoaiCauThu") VALUES($1) ON CONFLICT DO NOTHING RETURNING $1', [data.LoaiCauThu[i].TenLoaiCauThu]);
        }
        var ghiban=data.GHIBAN;
        for(var i=0;i<data.GHIBAN.length;i++){
            console.log(data.GHIBAN[i]);
            await db.one('INSERT INTO "GHIBAN" ("MaTranDau","MaCauThu","ThoiDiem","MaLoaiBanThang") VALUES($1,$2,$3,$4) ON CONFLICT DO NOTHING RETURNING $1', [data.GHIBAN[i].MaTranDau,data.GHIBAN[i].MaCauThu,data.GHIBAN[i].ThoiDiem,data.GHIBAN[i].MaLoaiBanThang]);
        }
        dataCauThu=data.CAUTHU;
        for(var i=0;i<14;i++){
            for(var j=0;j<15;j++){
                var a=data.CAUTHU[i][j].NgaySinh;
                const dateArray = a.split('/')
                const [day, month, year] = dateArray;
                const newDateString = `${month}/${day}/${year}`;
                await db.one('INSERT INTO "CAUTHU"("TenCauThu","NgaySinh","MaLoaiCauThu","MaDoi","GhiBan") VALUES($1,$2,$3,$4,$5) ON CONFLICT DO NOTHING RETURNING $1', [data.CAUTHU[i][j].TenCauThu,newDateString,data.CAUTHU[i][j].MaLoaiCauThu,data.CAUTHU[i][j].MaDoi,data.CAUTHU[i][j].GhiBan]);
            }
        }
        dataTranDau=data.TRANDAU;
        for(var i=0;i<dataTranDau.length;i++){
            var a=data.TRANDAU[i].NgayGio;
            const [dateString, timeString] = a.split(' ');
            const dateArray = dateString.split('/');
            const [day, month, year] = dateArray;
            const newDateString = `${year}-${month}-${day}`;
            const newDatetimeString = `${newDateString} ${timeString}`;
            console.log(newDatetimeString);
            await db.one('INSERT INTO "TRANDAU"("MaDoi1","MaDoi2","NgayGio","MaSan","VongDau","SoBanThangDoi1","SoBanThangDoi2") VALUES($1,$2,$3,$4,$5,$6,$7) ON CONFLICT DO NOTHING RETURNING $1', [data.TRANDAU[i].MaDoi1,data.TRANDAU[i].MaDoi2,newDatetimeString,data.TRANDAU[i].MaSan,data.TRANDAU[i].VongDau,data.TRANDAU[i].SoBanThangDoi1,data.TRANDAU[i].SoBanThangDoi2]);
        }
        
    }

}