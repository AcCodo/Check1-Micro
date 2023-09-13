const express = require('express')
const app = express()
app.use(express.json())
const mongoose = require('mongoose')

mongoose.connect('mongodb://fiap:123456@localhost:27017/admin')
//mongoose.connect('mongodb+srv://servicosinternos:Fiap123456@cluster0.li75evi.mongodb.net/servicosinternos?retryWrites=true&w=majority')

app.use(express.urlencoded({extended: true}))

//registro da model
require('./models/Departamento')
require('./models/Pessoas')

//Rotas
const departamentoRouter = require('./routers/departamento-route')
const pessoasRouter = require('./routers/pessoas-route')



app.use('/departamento', departamentoRouter)
app.use('/pessoas', pessoasRouter)

module.exports = app;