const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const schema = new Schema({
    nome :{
        type:String,
        required:[true, 'Nome é obrigatório']
    },
    documento :{
        type:String,
        required: [true, 'O documento é obrigatório']

    },
    endereco :{
        type:String,
        required: [true, 'O Endereço é obrigatório']
    },
    telefone :{
        type:Number,
        required: [true, 'O Telefone é obrigatório']
    }
    });

    module.exports = mongoose.model('Pessoas', schema)
