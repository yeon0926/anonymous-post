const express = require('express');
const router = express.Router();
require('dotenv').config()

const mysql = require('mysql');
const connection = mysql.createConnection({
  host : process.env.DB_HOST,
  user : process.env.DB_USER,
  password : process.env.DB_PASS,
  database : process.env.DB_NAME
}) 
connection.connect();

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
