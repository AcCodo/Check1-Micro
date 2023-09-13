const ValidationContract = require('../util/validador'); // Ajuste com o caminho correto para o validador
const repository = require("../repositories/departamento-repository");

exports.getAll = async (req, res, next) => {
    try {
        const data = await repository.getAll();
        if (data.length === 0) {
            res.status(204).send();
            return;
        }
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: "Erro no servidor, favor contactar o administrador."
        });
    }
};

exports.post = async (req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.nome, 4, 'O Nome precisa de no mínimo 4 caracteres.');
    contract.hasMaxLen(req.body.nome, 40, 'O Nome precisa de no máximo 40 caracteres.');
    contract.hasMinLen(req.body.setor, 2, 'O Setor precisa de no mínimo 2 caracteres.');
    contract.hasMaxLen(req.body.setor, 40, 'O Setor precisa de no máximo 40 caracteres.');

    try {
        if (!contract.isValid()) {
            res.status(400).send({
                message: "Erro ao cadastrar as informações. Favor validar",
                errors: contract.errors
            });
            return;
        }
        await repository.create(req.body);
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
    await repository.update(id, req.body); // Corrigido de res.body para req.body
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

    if (data == null) {
        res.status(404).send();
        return;
    }
    res.status(200).send(data);
};
