const {Pool}=require("pg");

const pool=new Pool({
user:"postgres",
host:"localhost",
database:"codes-for-tommorow",
password:"Jaiseetaram143@",
port:5432
})
module.exports=pool;