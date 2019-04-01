'use strict'

const bodyParser = require('body-parser')
const path = require('path')
const express = require('express')
const PORT = process.env.PORT || 8080
const app = express()

// Parse app body as JSON
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Serve static content from 'public' directory
app.use(express.static(path.join(__dirname, '/app/public/')))
app.use(express.static(path.join(__dirname, '/public/')))

// Handlebars
const exphbs = require('express-handlebars')
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// Import routes
const routes = require('./controllers/burgers_controllers')
app.use(routes)

// Start server
app.listen(PORT, () => console.log(`Server listening on: http://localhost:${PORT}`))