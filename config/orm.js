'use strict'

const connection = require('./connection')

function printQuestionMarks(num) {
    let arr = []
    for (let i = 0; i < num; i++) {
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
                value = `'${value}'`
            }
            arr.push(`${key}=${value}`)
        }
    }
    return arr.toString()
}
const orm = {
    all: (tableInput, cb) => {
        let queryString = `SELECT * FROM ${tableInput};`
        connection.query(queryString, (err, res) => {
            if (err) {
                throw err
            }
            cb(res)
        })
    },
    create: (table, cols, vals, cb) => {
        let queryString = `INSERT INTO ${table}`
        queryString += " ("
        queryString += cols.toString()
        queryString += ") "
        queryString += "VALUES ("
        queryString += printQuestionMarks(vals.length)
        queryString += ") "
        
        console.log(queryString)

        connection.query(queryString, vals, (err, res) => {
            if (err) {
                throw err
            }
            cb(res)
        })
    },
    update: (table, objColVals, condition, cb) => {
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
    delete: (table, condition, cb) => {
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