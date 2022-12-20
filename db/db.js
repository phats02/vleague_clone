const fs = require('fs');

let rawdata = fs.readFileSync('./db.json');
let student = JSON.parse(rawdata);
var count=0;
Doi1=[];
Doi2=[];
Tiso=[];
var SoBanThangDoi1,SoBanThangDoi2;
for (var i=0;i<13;i++){
    for(var j=0;j<13;j++){
        if(i!=j)
        {
            Doi1=student.Doi[i].TenDoi;
            Doi2=student.Doi[j].TenDoi;
            console.log(Doi1," vs ",Doi2);
            SoBanThangDoi1=Math.floor(Math.random() * 5);
            SoBanThangDoi2=Math.floor(Math.random() * 5);
            Tiso=SoBanThangDoi1 + " - " + SoBanThangDoi2;
            console.log(Tiso);
        }
    }
}

