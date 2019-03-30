'use strict'

const mysql = require('mysql')
const options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: process.env.DB_PASS,
    database: 'burgers_db'
}
const connection = mysql.createConnection(options)
module.exports = {
    options,
    connection
}