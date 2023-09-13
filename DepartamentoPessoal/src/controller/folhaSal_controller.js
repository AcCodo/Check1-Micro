const ValidationContract = require('../../util/validator');
const repository = require('../repositories/folhaSal-repository')
const services = require('../services/services')
const mongoose = require('mongoose')
const FolhaSal = mongoose.model('FolhaSal')

exports.getAll = async (req, res, next) => {
    const data = await repository.getAll();

    if (data.length === 0) {
        res.status(204).send();
        return;
    }

    res.status(200).send(data);
};

exports.post = async(req, res, next) => {
    let contract = new ValidationContract();
    contract.hasExactLen(req.body.codigoPessoa, 24, 'O codigo pessoa precisa ter exatamente 24 caracteres')

    contract.hasMinLen(req.body.salario, 4, 'O salário precisa de no mínimo 4 caracteres')
    contract.hasMaxLen(req.body.salario, 20, 'O salario precisa de no máximo 20 caracteres')

    contract.hasMinLen(req.body.data, 4, 'A data precisa de no mínimo 4 caracteres')
    contract.hasMaxLen(req.body.data, 20, 'A data precisa de no máximo 20 caracteres')

    contract.hasExactLen(req.body.codigoDept, 24, 'O codigo departamento precisa ter exatamente 24 caracteres')

    let folhaSal = FolhaSal(req.body)
    folhaSal.departamento = await services.getDepartamento(folhaSal.codigoDept)
    folhaSal.pessoa = await services.getPessoa(folhaSal.codigoPessoa)

    if (folhaSal.departamento == null || folhaSal.pessoa == null) {
        res.status(404).send('Erro na requisição de objetos relacionados')
        return
    }

    try{
        if(!contract.isValid()){
            res.status(400).send({
                message: "Erro ao cadastrar informações. Por favor, validar"
            })
            return;
        }
        
        await repository.create(folhaSal)
        res.status(201).send("Criado com sucesso!")
    } catch(error){
        res.status(500).send({
            message: "Erro no servidor, favor contatar o admnistrador " + error
        })
    }
    
};

exports.update = async(req, res, next) => {
    //http://localhost:3000/produto/1212313
    const id = req.params.id; //Na rota daremos apelido dete id

    await repository.update(id, req.body);


    //Enviar um e-mail 
    res.status(202).send("Atualizado com sucesso!")
};

exports.delete = async(req, res, next) => {
    const id = req.params.id; //Na rota daremos apelido dete id
    await repository.delete(id); //Deletando um produto 
    res.status(200).send("Removido com sucesso!")
}


exports.getById = async(req,res, next) => {
    const id = req.params.id;
    const data = await repository.getById(id);

    if(data == null)
        res.status(204).send()
    
    res.status(200).send(data);
}