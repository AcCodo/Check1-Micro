const ValidationContract = require('../util/validator'); 
const repository = require("../repositories/atendentes-repository"); 
const services = require('../services/services')
const mongoose = require('mongoose')
const Atendente = mongoose.model('Atendente')

exports.getAll = async (req, res, next) => {
    const data = await repository.getAll();

    if (data.length === 0) {
        res.status(204).send();
        return;
    }

    res.status(200).send(data);
};

exports.post = async (req, res, next) => {
    let contract = new ValidationContract();
    contract.hasExactLen(req.body.identificadorPessoa, 24,  'Identificador da Pessoa precisa ter exatamente 24 caracteres.');
    contract.hasExactLen(req.body.identificadorSetor, 24, 'Identificador do Setor precisa ter exatamente 24 caracteres.');

    let atendente = Atendente(req.body)
    atendente.pessoa = await services.getPessoa(atendente.identificadorPessoa)

    if (atendente.pessoa == null) {
        res.status(404).send("Erro na requisição de objetos relacionados")
        return
    }

    try {
        if (!contract.isValid()) {
            res.status(400).send({
                message: "Erro ao cadastrar as informações. Favor validar"
            });
            return;
        }
        await repository.create(atendente);
        res.status(201).send("Criado com sucesso!");
    } catch (error) {
        console.error(error); // Logando o erro no console
        res.status(500).send({
            message: "Erro no servidor, favor contactar o administrador."
        });
    }
};

exports.update = async (req, res, next) => {
    const id = req.params.id;
    await repository.update(id, req.body);
    res.status(200).send("Atualizado com sucesso!");
};

exports.delete = async (req, res, next) => {
    const id = req.params.id;
    await repository.delete(id);
    res.status(200).send('Removido com sucesso!');
};

exports.getById = async (req, res, next) => {
    const id = req.params.id;
    const data = await repository.getById(id);

    if (data == null)
        res.status(204).send();
    
    res.status(200).send(data);
};
