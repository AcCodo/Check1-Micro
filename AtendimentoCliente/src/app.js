const express = require('express')
const app = express()
app.use(express.json())
const mongoose = require('mongoose')

mongoose.connect('mongodb://fiap:123456@localhost:27017/admin')
//mongoose.connect('mongodb+srv://atendimentocliente:Fiap123456@cluster0.li75evi.mongodb.net/atendimentocliente?retryWrites=true&w=majority')


app.use(express.urlencoded({extended: true}))

//registro da model
require('./models/atendentes')
require('./models/registro-atendimento')
require('./models/tickets')

//Rotas
const atendenteRoute = require('./routers/atendente-route.js')
const registroAtendimentoRoute = require('./routers/registro-atendimento-route.js')
const ticketsRoute = require('./routers/tickets-route.js')

app.use('/atendentes', atendenteRoute)
app.use('/registro-atendimento', registroAtendimentoRoute)
app.use('/tickets', ticketsRoute)

module.exports = app;