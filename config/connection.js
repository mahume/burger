'use strict'

require('dotenv').config()
const mysql = require('mysql')

// Connection setup
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: process.env.DB_PASS,
    database: 'burgers_db'
})

// Make connection
connection.connect(err => {
    if (err) {
        console.log(`Error connecting: ${err.stack}`)
        return
    }
    console.log(`Connected as: ${connection.threadId}`)
})

module.exports = connection