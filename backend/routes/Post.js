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
  const id = req.body.id;

  connection.query(`select * from post where id = '${id}';`, function(err, rows){
    if(!err) {res.send({title : rows[0]['title'], contents : rows[0]['contents'], date : rows[0]['date'], commany : rows[0]['commany'] });}
    else {res.send(err);}
  });

  connection.end();
});

module.exports = router;