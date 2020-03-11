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
  const comments = req.body.comments;

  connection.query(`insert into comment value('${id}','${comments}') `, function(err, rows){
    if(!err) {res.send({success : true});}
    else {res.send({success : false});}
  });

  connection.end();
});

module.exports = router;