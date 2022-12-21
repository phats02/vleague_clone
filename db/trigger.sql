SELECT *FROM "DOI"
SELECT *FROM "CAUTHU"
SELECT *FROM "GHIBAN"
SELECT *FROM "LOAIBANTHANG"
SELECT *FROM "LOAICAUTHU"
SELECT *FROM "SAN"
SELECT *FROM "TRANDAU"
SELECT *FROM "RANKING"
SELECT *FROM "TAIKHOAN"
SELECT *FROM "THAMSO"



-- trigger đếm cầu thủ

CREATE OR REPLACE FUNCTION get_socauthuhientai_function(madoi integer)
RETURNS integer
AS
$$
DECLARE
	socauthuhientai integer;
BEGIN
	SELECT "SoCauThu" INTO socauthuhientai 
	FROM "DOI"
	WHERE "MaDoi"=madoi;
	RETURN socauthuhientai;
END;
$$
LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION update_socauthu_function()
RETURNS trigger 
AS
$$
DECLARE 
	socauthumoi integer;
	thongtin varchar(200);
	index1 integer;
	index2 integer;
	index3 integer;
	pointer integer;
	_count integer;
	macauthumoi integer;
	madoimoi integer;
	
BEGIN
	thongtin := NEW;
	pointer := 0;
	index1 := 0;
	index2 := 0;
	index3 :=0;
	_count := 0;
	FOR i IN 1..LENGTH(thongtin)
  	LOOP
    	IF SUBSTRING(thongtin FROM i FOR 1) = ',' THEN
     	 _count := _count + 1;
   		END IF;
		IF _count = 4 THEN
		 index1 := pointer+2;
		 EXIT;
		END IF;
		pointer := pointer+1  ;
  	END LOOP;
	
	index3 := index1-5;
	raise notice 'A new row was inserted: %',thongtin;
	
	macauthumoi := CAST(SUBSTRING(thongtin FROM index1 FOR 4) AS integer);
	madoimoi := CAST(SUBSTRING(thongtin FROM index3 FOR 4) AS integer);
	socauthumoi := get_socauthuhientai_function(madoimoi)+1;

	UPDATE "DOI"
	SET "SoCauThu"=socauthumoi
	WHERE "MaDoi"=madoimoi;
	
	return NULL;
END;
$$
LANGUAGE plpgsql;


CREATE OR REPLACE TRIGGER trigger_update_socauthu
AFTER INSERT ON "CAUTHU"
FOR EACH ROW 
EXECUTE PROCEDURE update_socauthu_function();

INSERT INTO "CAUTHU" ("TenCauThu","NgaySinh","MaLoaiCauThu","MaDoi","GhiBan","NgoaiQuoc")
VALUES ('Cristiano Rntnnhan','1/1/2001',1000,1000,2,'true');












-- trigger RANKING when insert row from TRANDAU

CREATE OR REPLACE FUNCTION update_ranking_function()
RETURNS trigger 
AS
$$
DECLARE 
	madoi1 integer;
	madoi2 integer;
	sobanthangdoi1 integer;
	sobanthangdoi2 integer;
	sotranthangdoi1 integer;
	sotranthangdoi2 integer;
	sotranhoadoi1 integer;
	sotranhoadoi2 integer;
	sotranthuadoi1 integer;
	sotranthuadoi2 integer;
	hieusodoi1 integer;
	hieusodoi2 integer;
-- 	t_row "TRANDAU"%rowtype;
-- 	cursor_variable CURSOR FOR SELECT * FROM "TRANDAU";
-- 	cursor CURSOR FOR SELECT * FROM "TRANDAU";
--   	row record;
-- 	row1 record;
	thongtin varchar(200);
BEGIN
	
-- 		FOR row IN SELECT * FROM "TRANDAU"
-- 		LOOP
-- 		madoi1 := row."MaDoi1";
-- 		madoi2 := row."MaDoi2";
-- 		sobanthangdoi1 := row."SoBanThangDoi1";
-- 		sobanthangdoi2 := row."SoBanThangDoi2";
		 
-- 		SELECT "SoTranThang" into sotranthangdoi1 FROM "RANKING" WHERE "MaDoi"=madoi1;
-- 		SELECT "SoTranThang" into sotranthangdoi2 FROM "RANKING" WHERE "MaDoi"=madoi2;
-- 		SELECT "SoTranHoa" into sotranhoadoi1 FROM "RANKING" WHERE "MaDoi"=madoi1;
-- 		SELECT "SoTranHoa" into sotranhoadoi2 FROM "RANKING" WHERE "MaDoi"=madoi2;
-- 		SELECT "SoTranThua" into sotranthuadoi1 FROM "RANKING" WHERE "MaDoi"=madoi1;
-- 		SELECT "SoTranThua" into sotranthuadoi2 FROM "RANKING" WHERE "MaDoi"=madoi2;
-- 		SELECT "HieuSo" into hieusodoi1 FROM "RANKING" WHERE "MaDoi"=madoi1;
-- 		SELECT "HieuSo" into hieusodoi2 FROM "RANKING" WHERE "MaDoi"=madoi2;
		
-- 		hieusodoi1 := hieusodoi1+(sobanthangdoi1 - sobanthangdoi2);
-- 		hieusodoi2 := hieusodoi2+(sobanthangdoi2 - sobanthangdoi1);
-- 		UPDATE "RANKING" SET "HieuSo"=hieusodoi1 WHERE "MaDoi"=madoi1;
-- 		UPDATE "RANKING" SET "HieuSo"=hieusodoi2 WHERE "MaDoi"=madoi2;
		
-- 		if sobanthangdoi1 > sobanthangdoi2 then
-- 			sotranthangdoi1 := sotranthangdoi1 +1;
-- 			sotranthuadoi2 := sotranthuadoi2 +1;
-- 			UPDATE "RANKING"
-- 			SET "SoTranThang"=sotranthangdoi1
-- 			WHERE "MaDoi"=madoi1;
-- 			RAISE NOTICE 'huhu';
-- 			UPDATE "RANKING"
-- 			SET "SoTranThua"=sotranthuadoi2
-- 			WHERE "MaDoi"=madoi2;
			
-- 		elseif sobanthangdoi1 < sobanthangdoi2 then
-- 			sotranthangdoi2 := sotranthangdoi2 +1;
-- 			sotranthuadoi1 := sotranthuadoi1 +1;
-- 			UPDATE "RANKING"
-- 			SET "SoTranThang"=sotranthangdoi2
-- 			WHERE "MaDoi"=madoi2;
-- 			RAISE NOTICE 'huhu1';
-- 			UPDATE "RANKING"
-- 			SET "SoTranThua"=sotranthuadoi1
-- 			WHERE "MaDoi"=madoi1;
			
-- 		elseif sobanthangdoi1 = sobanthangdoi2 then
-- 			sotranhoadoi2 := sotranhoadoi2 +1;
-- 			sotranhoadoi1 := sotranhoadoi1 +1;
-- 			UPDATE "RANKING"
-- 			SET "SoTranHoa"=sotranhoadoi1
-- 			WHERE "MaDoi"=madoi1;
-- 			RAISE NOTICE 'huhu2';
-- 			UPDATE "RANKING"
-- 			SET "SoTranHoa"=sotranhoadoi2
-- 			WHERE "MaDoi"=madoi2;
			
-- 		end if;
		
-- 		 RAISE NOTICE 'madoi1: %', madoi1;
-- 		 RAISE NOTICE 'madoi2: %', madoi2;
-- 		 RAISE NOTICE 'sbt1: %', sobanthangdoi1;
-- 		 RAISE NOTICE 'sbt2: %', sobanthangdoi2;
-- 		 RAISE NOTICE 'stt1: %', sotranthangdoi1;
-- 		 RAISE NOTICE 'stt2: %', sotranthangdoi2;
-- 		 RAISE NOTICE 'stthua1: %', sotranthuadoi1;
-- 		 RAISE NOTICE 'stthua2: %', sotranthuadoi2;
-- 		 RAISE NOTICE 'sth1: %', sotranhoadoi1;
-- 		 RAISE NOTICE 'sth2: %', sotranhoadoi2;
-- 		 RAISE NOTICE 'hs1: %', hieusodoi1;
-- 		 RAISE NOTICE 'hs2: %', hieusodoi2;
-- 		 RAISE NOTICE '\n';
		 
-- 	END LOOP;
	
	thongtin = NEW;
	
	madoi1 := NEW."MaDoi1";
	madoi2 := NEW."MaDoi2";
	sobanthangdoi1 := NEW."SoBanThangDoi1";
	sobanthangdoi2 := NEW."SoBanThangDoi2";

	SELECT "SoTranThang" into sotranthangdoi1 FROM "RANKING" WHERE "MaDoi"=madoi1;
	SELECT "SoTranThang" into sotranthangdoi2 FROM "RANKING" WHERE "MaDoi"=madoi2;
	SELECT "SoTranHoa" into sotranhoadoi1 FROM "RANKING" WHERE "MaDoi"=madoi1;
	SELECT "SoTranHoa" into sotranhoadoi2 FROM "RANKING" WHERE "MaDoi"=madoi2;
	SELECT "SoTranThua" into sotranthuadoi1 FROM "RANKING" WHERE "MaDoi"=madoi1;
	SELECT "SoTranThua" into sotranthuadoi2 FROM "RANKING" WHERE "MaDoi"=madoi2;
	SELECT "HieuSo" into hieusodoi1 FROM "RANKING" WHERE "MaDoi"=madoi1;
	SELECT "HieuSo" into hieusodoi2 FROM "RANKING" WHERE "MaDoi"=madoi2;

	hieusodoi1 := hieusodoi1+(sobanthangdoi1 - sobanthangdoi2);
	hieusodoi2 := hieusodoi2+(sobanthangdoi2 - sobanthangdoi1);

	if sobanthangdoi1 > sobanthangdoi2 then
		sotranthangdoi1 := sotranthangdoi1 +1;
		sotranthuadoi2 := sotranthuadoi2 +1;
		UPDATE "RANKING" SET "SoTranThang"=sotranthangdoi1 WHERE "MaDoi"=madoi1;
		UPDATE "RANKING" SET "SoTranThua"=sotranthuadoi2 WHERE "MaDoi"=madoi2;

	elseif sobanthangdoi1 < sobanthangdoi2 then
		sotranthangdoi2 := sotranthangdoi2 +1;
		sotranthuadoi1 := sotranthuadoi1 +1;
		UPDATE "RANKING" SET "SoTranThang"=sotranthangdoi2 WHERE "MaDoi"=madoi2;
		RAISE NOTICE 'huhu1';
		UPDATE "RANKING" SET "SoTranThua"=sotranthuadoi1 WHERE "MaDoi"=madoi1;

	elseif sobanthangdoi1 = sobanthangdoi2 then
		sotranhoadoi2 := sotranhoadoi2 +1;
		sotranhoadoi1 := sotranhoadoi1 +1;
		UPDATE "RANKING" SET "SoTranHoa"=sotranhoadoi1 WHERE "MaDoi"=madoi1;

		UPDATE "RANKING" SET "SoTranHoa"=sotranhoadoi2 WHERE "MaDoi"=madoi2;

	end if;
	
	UPDATE "RANKING" SET "HieuSo"=hieusodoi1 WHERE "MaDoi"=madoi1;
	UPDATE "RANKING" SET "HieuSo"=hieusodoi2 WHERE "MaDoi"=madoi2;
	
	
	CREATE TABLE "temp_table" AS SELECT "MaDoi", "SoTranThang","SoTranHoa","SoTranThua","HieuSo","Rank", 
	RANK() OVER (ORDER BY "Rank","HieuSo" DESC) as "rank"
	FROM "RANKING";
	
	UPDATE "RANKING" 
	SET "Rank"="temp_table".rank
	FROM "temp_table"
	WHERE "RANKING"."MaDoi"="temp_table"."MaDoi";
	
	drop table "temp_table";
	
	RETURN NEW;
END;
$$
LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER trigger_update_ranking
AFTER INSERT ON "TRANDAU"
FOR EACH ROW 
EXECUTE PROCEDURE update_ranking_function();

INSERT INTO "TRANDAU" ("MaDoi1","MaDoi2","NgayGio","MaSan","VongDau","SoBanThangDoi1","SoBanThangDoi2")
values (1000,1001,'2022-12-19 12:34:56',1000,2,6,3);


select *from "RANKING"


