const mongoose = require('mongoose');
const RegistroAtendimento = mongoose.model('RegistroAtendimento');

exports.get = async() => {
    const res = await RegistroAtendimento.find();
    return res;
};

exports.create = async(data) => {
    const registro = new RegistroAtendimento(data);
    await registro.save();
};

exports.delete = async(id) => {
    await RegistroAtendimento.findByIdAndDelete(id);
};

exports.getById = async(id) => {
    return await RegistroAtendimento.findById(id, "_id texto ticket");
};

exports.update = async(id, data) => {
    await RegistroAtendimento.findByIdAndUpdate(id, {
        $set: {
            texto: data.texto,
            ticket: data.ticket
        }
    });
};
