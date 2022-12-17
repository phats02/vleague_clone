/* San */
INSERT INTO "SAN" ("TenSan") values('Old Trafford');
INSERT INTO "SAN" ("TenSan") values('Etihad Stadium');

/* Loai ban thang */
INSERT INTO "LOAIBANTHANG" ("TenLoaiBanThang")
values ('Pen');
INSERT INTO "LOAIBANTHANG" ("TenLoaiBanThang")
values ('No-Pen');

/* Doi */
INSERT INTO "DOI" ("TenDoi","MaSan","SoCauThu")
values ('Portugal',1000,5);
INSERT INTO "DOI" ("TenDoi","MaSan","SoCauThu")
values ('Maroccos',1001,5);

/* Loai cau thu */
INSERT INTO "LOAICAUTHU" ("TenLoaiCauThu")
values ('Thủ môn');
INSERT INTO "LOAICAUTHU" ("TenLoaiCauThu")
values ('Hậu vệ');
INSERT INTO "LOAICAUTHU" ("TenLoaiCauThu")
values ('Tiền vệ');
INSERT INTO "LOAICAUTHU" ("TenLoaiCauThu")
values ('Tiền đạo');


/* Cau thu */
INSERT INTO "CAUTHU" ("TenCauThu","NgaySinh","MaLoaiCauThu","MaDoi","GhiBan")
values ('Costa','1/1/1999',1000,1000,0);
INSERT INTO "CAUTHU" ("TenCauThu","NgaySinh","MaLoaiCauThu","MaDoi","GhiBan")
values ('DaLot','1/2/1999',1001,1000,0);
INSERT INTO "CAUTHU" ("TenCauThu","NgaySinh","MaLoaiCauThu","MaDoi","GhiBan")
values ('PePe','1/3/1999',1001,1000,1);
INSERT INTO "CAUTHU" ("TenCauThu","NgaySinh","MaLoaiCauThu","MaDoi","GhiBan")
values ('Bruno','1/4/1999',1003,1000,0);
INSERT INTO "CAUTHU" ("TenCauThu","NgaySinh","MaLoaiCauThu","MaDoi","GhiBan")
values ('Ronaldo','5/1/1999',1003,1000,4);

INSERT INTO "CAUTHU" ("TenCauThu","NgaySinh","MaLoaiCauThu","MaDoi","GhiBan")
values ('Bono','1/1/1998',1000,1001,0);
INSERT INTO "CAUTHU" ("TenCauThu","NgaySinh","MaLoaiCauThu","MaDoi","GhiBan")
values ('Hakimi','1/2/1998',1001,1001,0);
INSERT INTO "CAUTHU" ("TenCauThu","NgaySinh","MaLoaiCauThu","MaDoi","GhiBan")
values ('Allah','1/3/1998',1001,1001,0);
INSERT INTO "CAUTHU" ("TenCauThu","NgaySinh","MaLoaiCauThu","MaDoi","GhiBan")
values ('Yamiq','1/4/1998',1002,1001,0);
INSERT INTO "CAUTHU" ("TenCauThu","NgaySinh","MaLoaiCauThu","MaDoi","GhiBan")
values ('Ounahi','5/1/1998',1002,1001,0);


/* Tran dau */
INSERT INTO "TRANDAU" ("MaDoi1","MaDoi2","NgayGio","MaSan","VongDau","SoBanThangDoi1","SoBanThangDoi2")
values (1000,1001,'12/11/2022 10:00:00 PM',1001,1,5,0);


/* Ghi ban */
INSERT INTO "GHIBAN" ("MaTranDau","MaCauThu","ThoiDiem","MaLoaiBanThang")
values (1000,1004,10,1000);
INSERT INTO "GHIBAN" ("MaTranDau","MaCauThu","ThoiDiem","MaLoaiBanThang")
values (1000,1004,12,1000);
INSERT INTO "GHIBAN" ("MaTranDau","MaCauThu","ThoiDiem","MaLoaiBanThang")
values (1000,1003,30,1001);
INSERT INTO "GHIBAN" ("MaTranDau","MaCauThu","ThoiDiem","MaLoaiBanThang")
values (1000,1004,75,1001);
INSERT INTO "GHIBAN" ("MaTranDau","MaCauThu","ThoiDiem","MaLoaiBanThang")
values (1000,1004,89,1000);



