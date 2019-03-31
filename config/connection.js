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
connection.connect(err => {
    if (err) {
        console.log(`Error connecting: ${err.stack}`)
        return
    }
    console.log(`Connected as: ${connection.threadId}`)
})
module.exports = {
    options,
    connection
}