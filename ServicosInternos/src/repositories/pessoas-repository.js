const mongoose = require('mongoose')
const Pessoas = mongoose.model('Pessoas')

exports.getAll = async()=>{
    const result = await Pessoas.find() ;
    return result;
}

exports.create = async(data)=> {
    let pessoas = Pessoas(data);
    await pessoas.save();
}

exports.delete = async(id) =>{
    await Pessoas.findByIdAndDelete(id)
}

exports.getById = async(id) =>{
    const result = await Pessoas.findOne({_id: id},
        "_id nome documento endereco telefone"
        );

        return result;
}

exports.update = async(id, data) =>{
    await Pessoas.findByIdAndUpdate(id,
    {
        $set:{
            nome: data.nome,
            documento: data.documento,
            endereco: data.endereco,
            telefone: data.telefone,

        }
    })
}