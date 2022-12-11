// San
INSERT INTO "SAN" ("MaSan","TenSan") values(1,'Old Trafford');
INSERT INTO "SAN" ("MaSan","TenSan") values(2,'Etihad Stadium');

// Loai ban thang
INSERT INTO "LOAIBANTHANG" ("MaLoaiBanThang","TenLoaiBanThang")
values (1,'Pen');
INSERT INTO "LOAIBANTHANG" ("MaLoaiBanThang","TenLoaiBanThang")
values (2,'No-Pen');

// Doi
INSERT INTO "DOI" ("MaDoi","TenDoi","MaSan","SoCauThu")
values (1,'Portugal',1,5);
INSERT INTO "DOI" ("MaDoi","TenDoi","MaSan","SoCauThu")
values (2,'Maroccos',2,5);

// Loai cau thu
INSERT INTO "LOAICAUTHU" ("MaLoaiCauThu","TenLoaiCauThu")
values (1,'Thủ môn');
INSERT INTO "LOAICAUTHU" ("MaLoaiCauThu","TenLoaiCauThu")
values (2,'Hậu vệ');
INSERT INTO "LOAICAUTHU" ("MaLoaiCauThu","TenLoaiCauThu")
values (3,'Tiền vệ');
INSERT INTO "LOAICAUTHU" ("MaLoaiCauThu","TenLoaiCauThu")
values (4,'Tiền đạo');


// Cau thu
INSERT INTO "CAUTHU" ("MaCauThu","TenCauThu","NgaySinh","MaLoaiCauThu","MaDoi","GhiBan")
values (1,'Costa','1/1/1999',1,1,0);
INSERT INTO "CAUTHU" ("MaCauThu","TenCauThu","NgaySinh","MaLoaiCauThu","MaDoi","GhiBan")
values (2,'DaLot','1/2/1999',2,1,0);
INSERT INTO "CAUTHU" ("MaCauThu","TenCauThu","NgaySinh","MaLoaiCauThu","MaDoi","GhiBan")
values (3,'PePe','1/3/1999',2,1,1);
INSERT INTO "CAUTHU" ("MaCauThu","TenCauThu","NgaySinh","MaLoaiCauThu","MaDoi","GhiBan")
values (4,'Bruno','1/4/1999',4,1,0);
INSERT INTO "CAUTHU" ("MaCauThu","TenCauThu","NgaySinh","MaLoaiCauThu","MaDoi","GhiBan")
values (5,'Ronaldo','5/1/1999',4,1,4);

INSERT INTO "CAUTHU" ("MaCauThu","TenCauThu","NgaySinh","MaLoaiCauThu","MaDoi","GhiBan")
values (6,'Bono','1/1/1998',1,2,0);
INSERT INTO "CAUTHU" ("MaCauThu","TenCauThu","NgaySinh","MaLoaiCauThu","MaDoi","GhiBan")
values (7,'Hakimi','1/2/1998',2,2,0);
INSERT INTO "CAUTHU" ("MaCauThu","TenCauThu","NgaySinh","MaLoaiCauThu","MaDoi","GhiBan")
values (8,'Allah','1/3/1998',2,2,0);
INSERT INTO "CAUTHU" ("MaCauThu","TenCauThu","NgaySinh","MaLoaiCauThu","MaDoi","GhiBan")
values (9,'Yamiq','1/4/1998',3,2,0);
INSERT INTO "CAUTHU" ("MaCauThu","TenCauThu","NgaySinh","MaLoaiCauThu","MaDoi","GhiBan")
values (10,'Ounahi','5/1/1998',3,2,0);


// Tran dau
INSERT INTO "TRANDAU" ("MaTranDau","MaDoi1","MaDoi2","NgayGio","MaSan","VongDau","SoBanThangDoi1","SoBanThangDoi2")
values (1,1,2,'12/11/2022',2,1,5,0);


// Ghi ban
INSERT INTO "GHIBAN" ("MaBanThang","MaTranDau","MaCauThu","ThoiDiem","MaLoaiBanThang")
values (1,1,5,'12/11/2022 10:30:30 PM',1);
INSERT INTO "GHIBAN" ("MaBanThang","MaTranDau","MaCauThu","ThoiDiem","MaLoaiBanThang")
values (2,1,5,'12/11/2022 10:35:30 PM',1);
INSERT INTO "GHIBAN" ("MaBanThang","MaTranDau","MaCauThu","ThoiDiem","MaLoaiBanThang")
values (3,1,2,'12/11/2022 10:40:35 PM',1);
INSERT INTO "GHIBAN" ("MaBanThang","MaTranDau","MaCauThu","ThoiDiem","MaLoaiBanThang")
values (4,1,5,'12/11/2022 11:20:20 PM',1);
INSERT INTO "GHIBAN" ("MaBanThang","MaTranDau","MaCauThu","ThoiDiem","MaLoaiBanThang")
values (5,1,5,'12/11/2022 11:31:30 PM',1);



