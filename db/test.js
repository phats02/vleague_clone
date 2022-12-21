const fs = require('fs');

let rawdata = fs.readFileSync('./db.json');
let Doibong = JSON.parse(rawdata);
let gio =["17:00","18:00","19:00"];
let san=Doibong.San;
let trandau=[
    
];
let a=0;
let dsDoiBongThamDu = Doibong.Doi;
var n= dsDoiBongThamDu.length/2;
for (let i = 1 ; i < 3 ; i++){
    let sovong=i;
    let TenSan;
    for ( let j = 0; j < n ; j++){
        if ( j==0 ){
            home = i;   away = 2*n;
            for(let i=0;i< 2*n;i++)
            {
                if(dsDoiBongThamDu[home-1].MaSan== san[i].MaSan)
                {
                    TenSan= san[i].TenSan;
                }
            }
            trandau[a] = {
                VongDau: sovong,
                NgayGio: gio[Math.floor(Math.random() * 3)],
                San: TenSan,
                Doi1: dsDoiBongThamDu[home-1].TenDoi,
                Doi2: dsDoiBongThamDu[away-1].TenDoi, 
                SoBanThangDoi1: Math.floor(Math.random() * 5),
                SoBanThangDoi2: Math.floor(Math.random() * 5)
            }
            a++;
        }
        else {
            home = i - j; away = i + j;
            if(home < 0)	home = home + ( 2*n - 1)
            if(home ===0)	home = 2*n - 1
            if(away >= 2*n)	away = away % (2*n - 1)
            if(dsDoiBongThamDu[home-1].TenDoi != dsDoiBongThamDu[away-1].TenDoi)
            {
                for(let i=0;i< 2*n;i++)
                {
                    if(dsDoiBongThamDu[home-1].MaSan== san[i].MaSan)
                    {
                       TenSan= san[i].TenSan;
                    }
                }  
                if(sovong == 1)
                {
                    trandau[a] = {
                    VongDau: sovong,
                    NgayGio: gio[Math.floor(Math.random() * 3)],
                    San: TenSan,
                    Doi1: dsDoiBongThamDu[home-1].TenDoi,
                    Doi2: dsDoiBongThamDu[away-1].TenDoi, 
                    SoBanThangDoi1: Math.floor(Math.random() * 5),
                    SoBanThangDoi2: Math.floor(Math.random() * 5)
                    }
                    a++;
                }
                else{
                    trandau[a] = {
                        VongDau: sovong,
                        NgayGio: gio[Math.floor(Math.random() * 3)],
                        San: TenSan,
                        Doi1:  dsDoiBongThamDu[home-1].TenDoi,
                        Doi2: dsDoiBongThamDu[away-1].TenDoi, 
                        SoBanThangDoi1: null,
                        SoBanThangDoi2: null 
                    }
                    a++;
                }
            }

        }         
    }
   
}
data = JSON.stringify(trandau);
fs.writeFileSync('./user.json', data, 'utf8');    
