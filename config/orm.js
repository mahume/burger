'use strict'

const connection = require('./connection')

function printQuestionMark(num) {
    let arr = []
    for (let i = 0; i < num.length; i++) {
        arr.push('?')
    }
    return arr.toString()
}
function objectToSQL(object) {
    let arr = []
    for (const key in object) {
        let value = object[key]
        if (Object.hasOwnProperty.call(object, key)) {
            if (typeof value === 'string' && value.indexOf(' ') >= 0) {
                value = `${value}`
            }
            arr.push(`${key}=${value}`)
        }
    }
    return arr.toString()
}
const orm = {
    all: function(tableInput, cb) {
        let queryString = `SELECT * FROM ${tableInput};`
        connection.query(queryString, (err, res) => {
            if (err) {
                throw err
            }
            cb(res)
        })
    },
    create: function(table, cols, vals, cb) {
        let queryString = `INSERT INTO ${table}`
        queryString += " ("
        queryString += cols.toString()
        queryString += ") "
        queryString += "VALUES ("
        queryString += printQuestionMark(vals.length)
        queryString += ") "
        
        console.log(queryString)

        connection.query(queryString, vals, (err, res) => {
            if (err) {
                throw err
            }
            cb(res)
        })
    },
    update: function(table, objColVals, condition, cb) {
        let queryString = `UPDATE ${table}`
        queryString += " SET "
        queryString += objectToSQL(objColVals)
        queryString += " WHERE "
        queryString += condition

        console.log(queryString)

        connection.query(queryString, (err, res) => {
            if (err) {
                throw err
            }
            cb(res)
        })
    },
    delete: function(table, condition, cb) {
        let queryString = `DELETE FROM ${table}`
        queryString += " WHERE "
        queryString += condition
        
        connection.query(queryString, (err, res) => {
            if (err) {
                throw err
            }
            cb(res)
        })        
    }
    
}

module.exports = orm