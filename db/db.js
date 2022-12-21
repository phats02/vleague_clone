const fs = require('fs');

let rawdata = fs.readFileSync('./db.json');
let doibong = JSON.parse(rawdata);
let dsDoiBongThamDu = doibong.Doi;
var n= dsDoiBongThamDu.length/2;
for (let i = 1 ; i < 2*n ; i++){
    let sovong=i;
    for ( let j = 0; j < n ; j++){
    
            if ( j==0 ){
                home = i;   away = 2*n;
                SoBanThangDoi1=Math.floor(Math.random() * 5);
                SoBanThangDoi2=Math.floor(Math.random() * 5);
                let trandau = {
                    VongDau: sovong,
                    Doi1:  dsDoiBongThamDu[home-1].TenDoi,
                    Doi2: dsDoiBongThamDu[away-1].TenDoi, 
                    Tiso: SoBanThangDoi1 + ' - ' + SoBanThangDoi2
                }
                console.log(trandau);
            }
            else {
                home = i - j; away = i + j;
                if(home < 0)	home = home + ( 2*n - 1)
                if(home ===0)	home = 2*n - 1
                if(away >= 2*n)	away = away % (2*n - 1)
                if(dsDoiBongThamDu[home-1].TenDoi != dsDoiBongThamDu[away-1].TenDoi)
                {
                    SoBanThangDoi1=Math.floor(Math.random() * 5);
                    SoBanThangDoi2=Math.floor(Math.random() * 5);
                    let trandau = {
                        VongDau: sovong,
                        Doi1:  dsDoiBongThamDu[home-1].TenDoi,
                        Doi2: dsDoiBongThamDu[away-1].TenDoi, 
                        Tiso: SoBanThangDoi1 + ' - ' + SoBanThangDoi2
                    }
                    console.log(trandau);
                }
            }
                
    }
    
}
for (let i = 1 ; i < 2*n ; i++){
    let sovong=i+2*n-1;
    for ( let j = 0; j < n ; j++){
        
        if ( j==0 ){
            home = 2*n;   away = i;
            SoBanThangDoi1=Math.floor(Math.random() * 5);
            SoBanThangDoi2=Math.floor(Math.random() * 5);
            let trandau = {
                     
                VongDau: sovong,
                Doi1:  dsDoiBongThamDu[home-1].TenDoi,
                Doi2: dsDoiBongThamDu[away-1].TenDoi, 
                Tiso: SoBanThangDoi1 + ' - ' + SoBanThangDoi2
                }
                console.log(trandau);
        }
        else {
            home = i + j; away = i - j;
            if(away < 0)	away = away + ( 2*n - 1)
            if(away ===0)	away = 2*n - 1
            if(home >= 2*n)	home = home % (2*n - 1)
            if(dsDoiBongThamDu[home-1].TenDoi != dsDoiBongThamDu[away-1].TenDoi)
            {
                SoBanThangDoi1=Math.floor(Math.random() * 5);
                SoBanThangDoi2=Math.floor(Math.random() * 5);
                let trandau = {
                    VongDau: sovong,
                    Doi1:  dsDoiBongThamDu[home-1].TenDoi,
                    Doi2: dsDoiBongThamDu[away-1].TenDoi, 
                    Tiso: SoBanThangDoi1 + ' - ' + SoBanThangDoi2
                    }
                    console.log(trandau);
            }
        }
                    
    }
        
}
