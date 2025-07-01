var express = require("express");
var router = express.Router();
var msyql = require("mysql");
var util = require("util");

var conn = msyql.createConnection({
    host:"bhs4zackyigggukzpyfq-mysql.services.clever-cloud.com",
    user:"ulrbh3wf7xm8hsqp",
    password:"HxiMsNrYvqnaMKZkDCoK",
    database:"bhs4zackyigggukzpyfq",
    port:"3306"
});

var exe = util.promisify(conn.query).bind(conn);

module.exports = exe;

// IronClad42