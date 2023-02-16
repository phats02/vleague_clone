
# A Vleauge Clone Project
## Introduction
The Project of Introduction of Software.  
Prototype and Screenshot: [Figma](https://www.figma.com/file/DBvkN0jidLcpPNNL2kO4jI/Prototype-for-NMCNPM?node-id=0%3A1&t=DEb25AthAiwD7i8J-1)
## I. How to run
###  I.1. Init Modules
To install the modules listed above, follow these steps:  
<ol> 
<li>Make sure that you have Node.js and npm (the Node.js package manager) installed on your system. You can check if you have them installed by running the following commands in your terminal:  

```console 
node -v  
npm -v
```
<li>
Create a package.json file in the root directory of your project by running the following command:  

```console
npm init -y
```
This will create a package.json file with default values.
<li> 
Install the modules listed above by running the following command:  

```console
npm install cookie-parser express express-handlebars express-session jsonwebtoken multer passport passport-jwt pg-promise bcrypt
```
This will install the required modules and add them to the dependencies section of your package.json file.</li>
</ol>  

### I.2. Init database   
#### Prequirement  
Make sure you have PostgreSQL installed on your system and that you have a database set up. If you don't have PostgreSQL installed, you can download it from the <a href='https://www.postgresql.org/'>PostgreSQL website</a> or install it using your system's package manager.  
#### To run script database
<ol>
<li>Open pgAdmin and connect to the database server.</li>
<li>In the Object browser on the left, expand the tree to find the database you want to use, then right-click on the database and select "Query Tool".</li>
<li>In the Query Tool window, click the "Open" button and select the script createtable.sql, trigger.sql was stored in folder <b>db</b>.</li>
<li>Click the "Execute" button to run the script. If the script contains any variables or parameters, you can specify their values in the "Variables" tab before executing the script.</li>
<li>The results of the script will be displayed in the "Output" tab.</li>
</ol>    


####  Config database  

Change your personal config for the postgresql in <b>config/pg-config.js</b>


## I.3. Run the server:  
```console
npm start
```
### Insert data row from json that emulator my league
Send GET request to http://localhost:3000/insert  
If your response is html that my home page, it was success, otherwise it may fail. Please let we know if you have a problem at any step.
## II. Assignment Sheet:
| Desciption | MSSV | Member|
| --- | ----------- |-------|
| Front-end | 20120367 |<a href='https://github.com/TamaKhank02'>@TamaKhank02</a>
| Back-end | 20120157 |<a href='https://github.com/phats02'>@phats02</a>|
|Create data to emulator league|20120576|<a href='https://github.com/thach030103'>@thach030103</a>|
|Create and manager database|20120151|<a href='https://github.com/nthanhnhan-dev'>@nthanhnhan-dev</a>|
