const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const registroAtendimentoSchema = new Schema({
    texto: {
        type: String,
        required: [true, 'O texto é obrigatório']
    },
    ticket: {
        type: Number,
        required: [true, 'O ticket é obrigatório']
    }
});

module.exports = mongoose.model('RegistroAtendimento', registroAtendimentoSchema);
