const express = require('express')
const router = express.Router()

const burger = require('../models/burger')

router.get('/', (req, res) => {
    burger.all(data => {
        let hbsObject = {
            burgers: data
        }
        console.log(hbsObject)
        res.render('index', hbsObject)
    })
})
router.post('/api/burgers', (req, res) => {
    burger.create([
        'name', 'devoured'
    ], [
        req.body.name, req.body.devoured
    ], (result) => {
        res.json({ id: result.insertId })
    })
})
router.put('api/burger/:id', (req, res) => {
    let condition = `id = ${req.params.id}`
    console.log(`condition ${condition}`)
    cat.update({
        devoured: req.body.devoured
    }, condition, result => {
        if (result.changedRows == 0) {
            return res.status(404).end()
        } else {
            res.status(200).end()
        }
    })
})
router.delete('api/burgers/:id', (req, res) => {
    let condition = `id = ${req.params.id}`
    cat.delete(condition, result => {
        if (result.affectedRows == 0) {
            return res.status(404).end()
        } else {
            res.status(200).end()
        }
    })
})

module.exports = router