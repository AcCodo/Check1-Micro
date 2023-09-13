const mongoose = require('mongoose');
const Atendente = mongoose.model('Atendente');

exports.getAll = async() => {
    const result = await Atendente.find();
    return result;
};

exports.create = async(data) => {
    const atendente = new Atendente(data);
    await atendente.save();
};

exports.delete = async(id) => {
    await Atendente.findByIdAndDelete(id);
};

exports.getById = async(id) => {
    return await Atendente.findOne({_id: id}, "_id identificadorPessoa identificadorSetor ativo");
};

exports.update = async(id, data) => {
    await Atendente.findByIdAndUpdate(id, {
        $set: {
            identificadorPessoa: data.identificadorPessoa,
            identificadorSetor: data.identificadorSetor
            
        }
    });
};
