const mongoose = require('mongoose')
const Departamento = mongoose.model('Departamento')

exports.getAll = async()=>{
    const result = await Departamento.find();
    return result;
}

exports.create = async(data)=> {
    let departamento = Departamento(data);
    await departamento.save();
}

exports.delete = async(id) =>{
   await Departamento.findByIdAndDelete(id);
}

exports.getById = async(id) =>{
    const result = await Departamento.findOne({_id: id},
        "_id codigo nome setor"
        );

        return result;
}

exports.update = async(id, data) =>{
    await Departamento.findByIdAndUpdate(id,
    {
        $set:{
            codigo: data.codigo,
            nome: data.nome,
            setor: data.setor
        }
    })
}