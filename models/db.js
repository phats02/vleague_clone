const pgp = require('pg-promise')();
const cn = require('../config/pg-config')
const db = pgp(cn);

var fs = require('fs')
const pathJSON='../vleague_clone/db/db.json';
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
        const data=await readDataFromJson(pathJSON);
        dataSan=data.San;
        for(var i=0;i<data.San.length;i++){
            //db.one('INSERT INTO "SAN"("TenSan") VALUES($1) ON CONFLICT DO NOTHING RETURNING $1', [data.San[i].TenSan]);
        }
        dataLoaiBanThang=data.LoaiBanThang;
        for(var i=0;i<dataLoaiBanThang.length;i++){
            //db.one('INSERT INTO "LOAIBANTHANG"("TenLoaiBanThang") VALUES($1) ON CONFLICT DO NOTHING RETURNING $1', [data.LoaiBanThang[i].TenLoaiBanThang]);
        }
        dataDoi=data.Doi;
        for(var i=0;i<data.Doi.length;i++){
            //db.one('INSERT INTO "DOI"("TenDoi","MaSan","SoCauThu") VALUES($1,$2,$3) ON CONFLICT DO NOTHING RETURNING $1', [data.Doi[i].TenDoi,data.Doi[i].MaSan,data.Doi[i].SoCauThu]);
        }
        data.LoaiCauThu=data.LoaiCauThu;
        for(var i=0;i<data.LoaiCauThu.length;i++){
            //db.one('INSERT INTO "LOAICAUTHU" ("TenLoaiCauThu") VALUES($1) ON CONFLICT DO NOTHING RETURNING $1', [data.LoaiCauThu[i].TenLoaiCauThu]);
        }
        dataCauThu=data.CauThu;
        for(var i=0;i<14;i++){
            for(var j=0;j<15;j++){
                var a=data.CauThu[i][j].NgaySinh;
                const dateArray = a.split('/')
                const [day, month, year] = dateArray;
                const newDateString = `${month}/${day}/${year}`;
                //db.one('INSERT INTO "CAUTHU"("TenCauThu","NgaySinh","MaLoaiCauThu","MaDoi","GhiBan") VALUES($1,$2,$3,$4,$5) ON CONFLICT DO NOTHING RETURNING $1', [data.CauThu[i][j].TenCauThu,newDateString,data.CauThu[i][j].MaLoaiCauThu,data.CauThu[i][j].MaDoi,data.CauThu[i][j].GhiBan]);
            }
        }
        dataTranDau=data.Trandau;
        for(var i=0;i<dataTranDau.length;i++){
            var a=data.Trandau[i].NgayGio;
            const [dateString, timeString] = a.split(' ');
            const dateArray = dateString.split('/');
            const [day, month, year] = dateArray;
            const newDateString = `${month}-${day}-${year}`;
            const newDatetimeString = `${newDateString} ${timeString}`;
            //console.log(newDatetimeString);
            //db.one('INSERT INTO "TRANDAU"("MaDoi1","MaDoi2","NgayGio","MaSan","VongDau","SoBanThangDoi1","SoBanThangDoi2") VALUES($1,$2,$3,$4,$5,$6,$7) ON CONFLICT DO NOTHING RETURNING $1', [data.Trandau[i].MaDoi1,data.Trandau[i].MaDoi2,newDatetimeString,data.Trandau[i].MaSan,data.Trandau[i].VongDau,data.Trandau[i].SoBanThangDoi1,data.Trandau[i].SoBanThangDoi2]);
        }
    }

}