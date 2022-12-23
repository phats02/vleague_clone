
# Đồ án V-League Clone
## Giới thiệu
Đồ án môn Nhập môn công nghệ phần mềm.

## I. Cài đặt
###  I.1. Khởi tạo modules
Cài đặt modules theo những bước sau:  
<ol> 
<li>Hãy đảm bảo máy bạn đã có sẵn Node.js và npm (Node.js package manager). Bạn có thể kiểm tra bằng cách chạy dòng code sau trong terminal:   

```console 
node -v  
npm -v
```
<li>
Chạy dòng lệnh sau để tạo file packeage.json tại trang thư mục gốc của project:   

```console
npm init -y
```   
Nó sẽ khởi tạo file package.json với giá trị mặc định.  
<li> 
Cài đặt các modules theo dòng lệnh sau:   

```console
npm install cookie-parser express express-handlebars express-session jsonwebtoken multer passport passport-jwt pg-promise bcrypt
```
</li>
</ol>  

### I.2. Khởi tạo database   
#### Yêu cầu  
Trước tiên, bạn cần cài đặt PostgreSQL trong máy. Nếu bạn chưa cài đặt PostgreSQL, bạn có thể tải tại <a href='https://www.postgresql.org/'>PostgreSQL website</a> và theo hướng dẫn của website.  
#### Chạy script database
<ol>
<li>Mở pgAdmin và connect vào database.</li>
<li>Trong thanh Object nằm bên trái, mở rộng và tìm database của bạn, nhấn chuột phải vào database và chọn "Query Tool".</li>
<li>Trong cửa sổ Query Tool, click "Open" và chọn script createtable.sql, trigger.sql được lưu sẵn trong folder <b>db</b>.</li>
<li>Click "Execute" để chạy script.</li>
<li> Kết quả được hiển thị tại khung "Output".</li>
</ol>    


####  Config database  

Chỉnh sửa các giá trị cofig postgresql của bạn tại  <b>config/pg-config.js</b>


## I.3. Chạy server:  
```console
npm start
```
### Thêm data row từ json
Gửi GET request tới http://localhost:3000/insert  
Nếu response là trang html của home page việc thêm dữ liệu đã thành công.
## II. Bảng phân công:
| Mô tả công việc | MSSV | Thành viên|
| --- | ----------- |-------|
| Front-end | 20120367 |<a href='https://github.com/TamaKhank02'>@TamaKhank02</a>
| Back-end | 20120157 |<a href='https://github.com/phats02'>@phats02</a>|
|Create data to emulator league|20120576|<a href='https://github.com/thach030103'>@thach030103</a>|
|Create and manager database|20120157|<a href='https://github.com/nthanhnhan-dev'>@nthanhnhan-dev</a>|
