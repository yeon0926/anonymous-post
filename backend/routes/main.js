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
  const pageNum = req.body.pageNum -1;
  let newid = 0;
  
    connection.query(`select newId from main`, function(err, rows){
      if(!err){ newid = rows[0]['newId'] }
      else {res.send(err);}
    });

    newid = newid - (pageNum * 26);
    connection.query(`select id and date and title and commany from main where id < ${newid} and id > ${newid -26}`, function(err, rows){
      if(!err){ res.send({id : rows[0]['id'], date : rows[0]['date'], title : rows[0]['title'], commany : rows[0]['commany']}); }
      else {res.send(err);}
    });
  
  connection.end();
});

module.exports = router;
