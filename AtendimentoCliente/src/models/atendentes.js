const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pessoaSchema = new Schema({
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
});

const atendentesSchema = new Schema({
    identificadorPessoa: {
        type: String,
        required: [true, 'O identificador da pessoa é obrigatório']
    },
    pessoa: {
        type: pessoaSchema
    },
    identificadorSetor: {
        type: String,
        required: [true, 'O identificador do setor é obrigatório']
    }
});

module.exports = mongoose.model('Atendente', atendentesSchema);
