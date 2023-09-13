const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
    identificadorAtendente: {
        type: String,
        required: [true, "Identificador do atendente é obrigatório"]
    },
    titulo: {
        type: String,
        required: [true, "Título é obrigatório"]
    },
    telefone: {
        type:Number, 
        required: [true, "Telefone é obrigatório"]
    },
    identificadorCliente: {
        type:Number, 
        required: [true, "Identificador do cliente é obrigatório"]
    }
});

module.exports = mongoose.model('Ticket', ticketSchema);
