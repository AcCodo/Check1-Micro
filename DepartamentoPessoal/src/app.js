const express = require('express')
const app = express()
app.use(express.json())
const mongoose = require('mongoose')

mongoose.connect('mongodb://fiap:123456@localhost:27017/admin')

app.use(express.urlencoded({
    extended: true
}))


//registro da model
require('./models/folhaSal')

//Rotas
const folhaSalRouter = require('./routers/folhaSal-route')



app.use('/folhaSal', folhaSalRouter)

module.exports = app;