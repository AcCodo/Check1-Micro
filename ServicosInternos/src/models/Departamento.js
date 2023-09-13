const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const schema = new Schema({
    codigo :{
        type:Number,
        required:[true, 'O número do departamento é obrigatório']
    },
    nome :{
        type:String,
        required: [true, 'Nome é obrigatório']

    },
    setor :{
        type:String,
        required: [true, 'O Setor é obrigatório']
    }
    });

    module.exports = mongoose.model('Departamento', schema)
