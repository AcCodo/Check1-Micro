const mongoose = require('mongoose')
const Schema = mongoose.Schema;
//const Departamento = mongoose.schema('schemaDepartamento')

const schemaDepartamento = new Schema({
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

const schemaPessoa = new Schema ({
    nome: {
        type: String,
        required: [true, 'Nome é obrigatório']
    },
    documento: {
        type: String,
        required: [true, 'O documento é obrigatório']

    },
    endereco: {
        type: String,
        required: [true, 'O Endereço é obrigatório']
    },
    telefone: {
        type: Number,
        required: [true, 'O Telefone é obrigatório']
    }
})

const schema = new Schema({
    codigoPessoa :{
        type:String,
        required:true,
    },
    pessoa: {
        type: schemaPessoa
    },
    salario :{
        type: Number,
        required: true
    },
    data :{
        type: String,
        required: true    
    },
    codigoDept :{
        type: String,
        required: true
    },
    departamento: {
        type: schemaDepartamento
    }
});


module.exports = mongoose.model('FolhaSal', schema)
