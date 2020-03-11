const express = require('express');
const router = express.Router();
require('dotenv').config();

const mysql = require('mysql');
const connection = mysql.createConnection({
  host : process.env.DB_HOST,
  user : process.env.DB_USER,
  password : process.env.DB_PASS,
  database : process.env.DB_NAME
})
connection.connect();

router.post('/', function(req, res, next) {

  let id = 1;
  const date = req.body.date;
  const title = req.body.title;
  const contents = req.body.contents;

  connection.query(`select * from main;`, function(err, rows, fields){
    if(!err){id = rows[0]['newId'] + 1;}
    else {res.send({success : false});}
  });

  connection.query(`update main set newId = ${id};`, function(err, rows, fields){});

  connection.query(`insert into post values('${id}','${date}','${title}',0,'${contents}');`, function(err, rows, fields){
    if(!err){res.send({success : true});}
    else {res.send({success : false});}
  });

  connection.end();
});

module.exports = router;