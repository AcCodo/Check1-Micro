const mongoose = require('mongoose')
const FolhaSal = mongoose.model('FolhaSal')

exports.getAll = async()=>{
    const result = await FolhaSal.find();
    return result;
}

exports.create = async(data) => {
    let folhaSal = FolhaSal(data);

    await folhaSal.save();
} 

exports.delete = async(id) => {
    await FolhaSal.findByIdAndDelete( id)
}

exports.getById = async(id) => {
    const result = await FolhaSal.findOne({_id: id},
      "_id codigoPessoa salario data codigoDept"  
    )

    return result;
}

exports.update = async(id, data) => {
    await FolhaSal. findByIdAndUpdate(id,
        {
            $set:{

                codigoPessoa: data.codigoPessoa,
                salario: data.salario,
                data: data.data,
                codigoDept: data.codigoDept
            }
        }
    )
}


