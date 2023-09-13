const mongoose = require('mongoose');
const Ticket = mongoose.model('Ticket');

exports.get = async () => {
    const result = await Ticket.find();
    return result;
};

exports.create = async (data) => {
    const ticket = new Ticket(data);
    await ticket.save();
};

exports.delete = async (id) => {
    await Ticket.findByIdAndDelete(id, {
        $set: {
            ativo: false
        }
    });
};

exports.getById = async (id) => {
    return await Ticket.findOne({ _id: id }, "_id identificadorAtendente titulo telefone identificadorCliente");
};

exports.update = async (id, data) => {
    await Ticket.findByIdAndUpdate(id, {
        $set: {
            identificadorAtendente: data.identificadorAtendente,
            titulo: data.titulo,
            telefone: data.telefone,
            identificadorCliente: data.identificadorCliente
        }
    });
};
